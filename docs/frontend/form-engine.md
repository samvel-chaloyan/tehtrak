# Form Engine

> **Documentation layer:** Implementation. For visual rules see [ui-constitution.md](./ui-constitution.md), [components.md](./components.md), and [ui-system.md](./ui-system.md). Index: [README.md](./README.md).

Dynamic forms rendered from `Field[]` metadata. No hand-coded forms per collection.

## Pipeline

```
Field definitions (API)
    ↓
buildZodSchema(fields) → Zod schema
    ↓
useForm({ resolver: zodResolver(schema) })
    ↓
renderField(field) → component by type
    ↓
onSubmit → map to Record.data → API / SQLite
```

## Field type → component mapping

| Field type | Component | Input mode |
|------------|-----------|------------|
| `text` | `TextInput` | default keyboard |
| `number` | `NumericInput` | decimal pad |
| `date` | `DatePicker` | native picker |
| `boolean` | `Toggle` | switch |
| `select` | `BottomSheetSelector` | single choice |
| `multiselect` | `MultiSelectChips` | multiple chips |
| `image` | `ImagePickerField` | camera + gallery |
| `barcode` | `BarcodeScannerField` | Phase 2 |
| `location` | `LocationPicker` | Phase 2 |
| `relation` | `RelationPicker` | Phase 2 |
| `formula` | read-only computed | Phase 2 |

## Zod schema generation

```typescript
function buildZodSchema(fields: Field[]): z.ZodObject<...> {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) {
    shape[field.key] = fieldSchema(field);
  }
  return z.object(shape);
}

function fieldSchema(field: Field): z.ZodTypeAny {
  switch (field.type) {
    case 'text':
      return field.required
        ? z.string().min(1).max(field.config.maxLength ?? 500)
        : z.string().max(500).optional();
    case 'number':
      let s = z.number();
      if (field.config.min != null) s = s.min(field.config.min);
      if (field.config.max != null) s = s.max(field.config.max);
      return field.required ? s : s.optional();
    case 'date':
      return field.required
        ? z.string().datetime()
        : z.string().datetime().optional();
    case 'boolean':
      return field.required ? z.boolean() : z.boolean().optional();
    case 'select':
      const values = field.config.options.map(o => o.value);
      const e = z.enum(values as [string, ...string[]]);
      return field.required ? e : e.optional();
    // ...
  }
}
```

## renderField

```typescript
function renderField(
  field: Field,
  control: Control<RecordFormValues>,
): React.ReactNode {
  switch (field.type) {
    case 'text':
      return <ControlledTextInput name={field.key} control={control} label={field.label} />;
    // ...
  }
}
```

## Form screens

### `RecordFormScreen`

- Loads `fields` via `useFields(collectionId)`
- `buildZodSchema` + `useForm`
- Renders fields sorted by `sortOrder`
- Submit → `useCreateRecord` or `useUpdateRecord`

### `FieldEditorScreen` (collection setup)

- Separate form for admin/manager to add properties
- Not part of dynamic record engine

## Value serialization

| Type | Stored in `data` |
|------|------------------|
| text | string |
| number | number |
| date | ISO8601 string |
| boolean | boolean |
| select | string (option value) |
| multiselect | string[] |
| image | attachment id string |

## UX rules

- Show required indicator on label
- Validate on submit (not per-keystroke) for speed
- Focus first invalid field on error
- Sticky bottom submit bar (thumb zone)
- Preserve draft in SQLite on navigate away (Phase 2)

## File structure

```
features/records/
├── validation/
│   ├── buildZodSchema.ts
│   └── fieldSchema.ts
├── components/
│   ├── DynamicRecordForm.tsx
│   └── fields/
│       ├── TextFieldInput.tsx
│       ├── NumberFieldInput.tsx
│       └── ...
```
