import { PropertyField, PropertyType, SelectOption } from '@/types';

type FieldInput = {
  id: string;
  collectionId: string;
  key: string;
  label: string;
  type: PropertyType;
  required?: boolean;
  sortOrder: number;
  options?: SelectOption[];
  min?: number;
  max?: number;
  maxLength?: number;
};

function field(input: FieldInput): PropertyField {
  const config =
    input.type === 'select'
      ? { options: input.options ?? [] }
      : input.type === 'number'
        ? {
            ...(input.min !== undefined ? { min: input.min } : {}),
            ...(input.max !== undefined ? { max: input.max } : {}),
          }
        : input.type === 'text' && input.maxLength
          ? { maxLength: input.maxLength }
          : undefined;

  return {
    id: input.id,
    collectionId: input.collectionId,
    key: input.key,
    label: input.label,
    type: input.type,
    required: input.required ?? false,
    sortOrder: input.sortOrder,
    ...(config && Object.keys(config).length > 0 ? { config } : {}),
  };
}

const yesNo: SelectOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

const paidParking: SelectOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Monthly subscriber', value: 'monthly' },
];

const incidentStatus: SelectOption[] = [
  { label: 'Open', value: 'open' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Watching', value: 'watching' },
];

const ticketStatus: SelectOption[] = [
  { label: 'Open', value: 'open' },
  { label: 'Paid', value: 'paid' },
  { label: 'Waived', value: 'waived' },
];

const plantStatus: SelectOption[] = [
  { label: 'Growing', value: 'growing' },
  { label: 'Healthy', value: 'healthy' },
  { label: 'Needs attention', value: 'needs_attention' },
  { label: 'Done for season', value: 'done' },
];

const checkStatus: SelectOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];

const dispatchStatus: SelectOption[] = [
  { label: 'Queued', value: 'queued' },
  { label: 'Packed', value: 'packed' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Held', value: 'held' },
];

const assignmentStatus: SelectOption[] = [
  { label: 'Not Started', value: 'not_started' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
];

const priority: SelectOption[] = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

const paidSession: SelectOption[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'Deposit', value: 'deposit' },
  { label: 'Pending', value: 'pending' },
  { label: 'No', value: 'no' },
];

const maintStatus: SelectOption[] = [
  { label: 'Due soon', value: 'due_soon' },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'Overdue', value: 'overdue' },
  { label: 'Done', value: 'done' },
];

const shopPriority: SelectOption[] = [
  { label: 'Need soon', value: 'soon' },
  { label: 'This week', value: 'week' },
  { label: 'Whenever', value: 'whenever' },
];

export const mockFields: PropertyField[] = [
  // Visitor Parking
  field({ id: 'f-vp-plate', collectionId: 'col-visitor-parking', key: 'plate_number', label: 'Plate Number', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-vp-owner', collectionId: 'col-visitor-parking', key: 'owner', label: 'Owner', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-vp-vehicle', collectionId: 'col-visitor-parking', key: 'vehicle', label: 'Vehicle', type: 'text', required: true, sortOrder: 2 }),
  field({ id: 'f-vp-entry', collectionId: 'col-visitor-parking', key: 'entry_time', label: 'Entry Time', type: 'text', required: true, sortOrder: 3 }),
  field({ id: 'f-vp-exit', collectionId: 'col-visitor-parking', key: 'planned_exit', label: 'Planned Exit', type: 'text', sortOrder: 4 }),
  field({ id: 'f-vp-zone', collectionId: 'col-visitor-parking', key: 'parking_zone', label: 'Parking Zone', type: 'text', required: true, sortOrder: 5 }),
  field({ id: 'f-vp-paid', collectionId: 'col-visitor-parking', key: 'paid', label: 'Paid', type: 'select', required: true, sortOrder: 6, options: paidParking }),
  field({ id: 'f-vp-notes', collectionId: 'col-visitor-parking', key: 'notes', label: 'Notes', type: 'text', sortOrder: 7, maxLength: 240 }),

  // Monthly Subscribers
  field({ id: 'f-ms-plate', collectionId: 'col-monthly-subscribers', key: 'plate_number', label: 'Plate Number', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-ms-name', collectionId: 'col-monthly-subscribers', key: 'name', label: 'Name', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-ms-vehicle', collectionId: 'col-monthly-subscribers', key: 'vehicle', label: 'Vehicle', type: 'text', sortOrder: 2 }),
  field({ id: 'f-ms-zone', collectionId: 'col-monthly-subscribers', key: 'zone', label: 'Zone', type: 'text', required: true, sortOrder: 3 }),
  field({ id: 'f-ms-started', collectionId: 'col-monthly-subscribers', key: 'started', label: 'Started', type: 'date', required: true, sortOrder: 4 }),
  field({ id: 'f-ms-expires', collectionId: 'col-monthly-subscribers', key: 'expires', label: 'Expires', type: 'date', sortOrder: 5 }),
  field({ id: 'f-ms-notes', collectionId: 'col-monthly-subscribers', key: 'notes', label: 'Notes', type: 'text', sortOrder: 6 }),

  // Incidents
  field({ id: 'f-in-date', collectionId: 'col-incidents', key: 'date', label: 'Date', type: 'date', required: true, sortOrder: 0 }),
  field({ id: 'f-in-type', collectionId: 'col-incidents', key: 'type', label: 'Type', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-in-location', collectionId: 'col-incidents', key: 'location', label: 'Location', type: 'text', required: true, sortOrder: 2 }),
  field({ id: 'f-in-by', collectionId: 'col-incidents', key: 'reported_by', label: 'Reported By', type: 'text', required: true, sortOrder: 3 }),
  field({ id: 'f-in-status', collectionId: 'col-incidents', key: 'status', label: 'Status', type: 'select', required: true, sortOrder: 4, options: incidentStatus }),
  field({ id: 'f-in-desc', collectionId: 'col-incidents', key: 'description', label: 'Description', type: 'text', sortOrder: 5, maxLength: 400 }),

  // Lost Tickets
  field({ id: 'f-lt-date', collectionId: 'col-lost-tickets', key: 'date', label: 'Date', type: 'date', required: true, sortOrder: 0 }),
  field({ id: 'f-lt-plate', collectionId: 'col-lost-tickets', key: 'plate_number', label: 'Plate Number', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-lt-by', collectionId: 'col-lost-tickets', key: 'reported_by', label: 'Reported By', type: 'text', sortOrder: 2 }),
  field({ id: 'f-lt-status', collectionId: 'col-lost-tickets', key: 'status', label: 'Status', type: 'select', required: true, sortOrder: 3, options: ticketStatus }),
  field({ id: 'f-lt-fee', collectionId: 'col-lost-tickets', key: 'fee', label: 'Fee', type: 'text', sortOrder: 4 }),
  field({ id: 'f-lt-notes', collectionId: 'col-lost-tickets', key: 'notes', label: 'Notes', type: 'text', sortOrder: 5 }),

  // Refrigerated
  field({ id: 'f-rf-product', collectionId: 'col-refrigerated', key: 'product', label: 'Product', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-rf-qty', collectionId: 'col-refrigerated', key: 'quantity', label: 'Quantity', type: 'number', required: true, sortOrder: 1, min: 0 }),
  field({ id: 'f-rf-expires', collectionId: 'col-refrigerated', key: 'expires', label: 'Expires', type: 'date', sortOrder: 2 }),
  field({ id: 'f-rf-location', collectionId: 'col-refrigerated', key: 'location', label: 'Location', type: 'text', sortOrder: 3 }),
  field({ id: 'f-rf-opened', collectionId: 'col-refrigerated', key: 'opened', label: 'Opened', type: 'text', sortOrder: 4 }),
  field({ id: 'f-rf-notes', collectionId: 'col-refrigerated', key: 'notes', label: 'Notes', type: 'text', sortOrder: 5 }),

  // Freezer
  field({ id: 'f-fz-product', collectionId: 'col-freezer', key: 'product', label: 'Product', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-fz-qty', collectionId: 'col-freezer', key: 'quantity', label: 'Quantity', type: 'number', required: true, sortOrder: 1, min: 0 }),
  field({ id: 'f-fz-expires', collectionId: 'col-freezer', key: 'expires', label: 'Expires', type: 'date', sortOrder: 2 }),
  field({ id: 'f-fz-location', collectionId: 'col-freezer', key: 'location', label: 'Location', type: 'text', sortOrder: 3 }),
  field({ id: 'f-fz-notes', collectionId: 'col-freezer', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Dry Storage
  field({ id: 'f-ds-product', collectionId: 'col-dry-storage', key: 'product', label: 'Product', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-ds-qty', collectionId: 'col-dry-storage', key: 'quantity', label: 'Quantity', type: 'number', required: true, sortOrder: 1, min: 0 }),
  field({ id: 'f-ds-expires', collectionId: 'col-dry-storage', key: 'expires', label: 'Expires', type: 'date', sortOrder: 2 }),
  field({ id: 'f-ds-location', collectionId: 'col-dry-storage', key: 'location', label: 'Location', type: 'text', sortOrder: 3 }),
  field({ id: 'f-ds-notes', collectionId: 'col-dry-storage', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Shopping List
  field({ id: 'f-sl-item', collectionId: 'col-shopping-list', key: 'item', label: 'Item', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-sl-qty', collectionId: 'col-shopping-list', key: 'quantity', label: 'Quantity', type: 'text', sortOrder: 1 }),
  field({ id: 'f-sl-store', collectionId: 'col-shopping-list', key: 'store', label: 'Store', type: 'text', sortOrder: 2 }),
  field({ id: 'f-sl-priority', collectionId: 'col-shopping-list', key: 'priority', label: 'Priority', type: 'select', sortOrder: 3, options: shopPriority }),
  field({ id: 'f-sl-bought', collectionId: 'col-shopping-list', key: 'bought', label: 'Bought', type: 'boolean', sortOrder: 4 }),

  // Vegetables
  field({ id: 'f-vg-plant', collectionId: 'col-vegetables', key: 'plant', label: 'Plant', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-vg-variety', collectionId: 'col-vegetables', key: 'variety', label: 'Variety', type: 'text', sortOrder: 1 }),
  field({ id: 'f-vg-planted', collectionId: 'col-vegetables', key: 'planted', label: 'Planted', type: 'date', sortOrder: 2 }),
  field({ id: 'f-vg-watered', collectionId: 'col-vegetables', key: 'watered', label: 'Watered', type: 'text', sortOrder: 3 }),
  field({ id: 'f-vg-status', collectionId: 'col-vegetables', key: 'status', label: 'Status', type: 'select', sortOrder: 4, options: plantStatus }),
  field({ id: 'f-vg-notes', collectionId: 'col-vegetables', key: 'notes', label: 'Notes', type: 'text', sortOrder: 5 }),

  // Fruit Trees
  field({ id: 'f-ft-tree', collectionId: 'col-fruit-trees', key: 'tree', label: 'Tree', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-ft-variety', collectionId: 'col-fruit-trees', key: 'variety', label: 'Variety', type: 'text', sortOrder: 1 }),
  field({ id: 'f-ft-planted', collectionId: 'col-fruit-trees', key: 'planted', label: 'Planted', type: 'date', sortOrder: 2 }),
  field({ id: 'f-ft-pruned', collectionId: 'col-fruit-trees', key: 'last_pruned', label: 'Last Pruned', type: 'date', sortOrder: 3 }),
  field({ id: 'f-ft-status', collectionId: 'col-fruit-trees', key: 'status', label: 'Status', type: 'text', sortOrder: 4 }),
  field({ id: 'f-ft-notes', collectionId: 'col-fruit-trees', key: 'notes', label: 'Notes', type: 'text', sortOrder: 5 }),

  // Tools
  field({ id: 'f-tl-tool', collectionId: 'col-tools', key: 'tool', label: 'Tool', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-tl-condition', collectionId: 'col-tools', key: 'condition', label: 'Condition', type: 'text', sortOrder: 1 }),
  field({ id: 'f-tl-location', collectionId: 'col-tools', key: 'location', label: 'Location', type: 'text', sortOrder: 2 }),
  field({ id: 'f-tl-used', collectionId: 'col-tools', key: 'last_used', label: 'Last Used', type: 'text', sortOrder: 3 }),
  field({ id: 'f-tl-notes', collectionId: 'col-tools', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Harvest Log
  field({ id: 'f-hl-crop', collectionId: 'col-harvest-log', key: 'crop', label: 'Crop', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-hl-amount', collectionId: 'col-harvest-log', key: 'amount', label: 'Amount', type: 'text', sortOrder: 1 }),
  field({ id: 'f-hl-date', collectionId: 'col-harvest-log', key: 'date', label: 'Date', type: 'date', required: true, sortOrder: 2 }),
  field({ id: 'f-hl-used', collectionId: 'col-harvest-log', key: 'used_for', label: 'Used For', type: 'text', sortOrder: 3 }),
  field({ id: 'f-hl-notes', collectionId: 'col-harvest-log', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Incoming Goods
  field({ id: 'f-ig-sku', collectionId: 'col-incoming-goods', key: 'sku', label: 'SKU', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-ig-product', collectionId: 'col-incoming-goods', key: 'product', label: 'Product', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-ig-qty', collectionId: 'col-incoming-goods', key: 'quantity', label: 'Quantity', type: 'number', required: true, sortOrder: 2, min: 0 }),
  field({ id: 'f-ig-supplier', collectionId: 'col-incoming-goods', key: 'supplier', label: 'Supplier', type: 'text', sortOrder: 3 }),
  field({ id: 'f-ig-received', collectionId: 'col-incoming-goods', key: 'received', label: 'Received', type: 'date', required: true, sortOrder: 4 }),
  field({ id: 'f-ig-checked', collectionId: 'col-incoming-goods', key: 'checked', label: 'Checked', type: 'select', sortOrder: 5, options: checkStatus }),

  // Shelf Locations
  field({ id: 'f-sh-sku', collectionId: 'col-shelf-locations', key: 'sku', label: 'SKU', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-sh-product', collectionId: 'col-shelf-locations', key: 'product', label: 'Product', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-sh-aisle', collectionId: 'col-shelf-locations', key: 'aisle', label: 'Aisle', type: 'text', sortOrder: 2 }),
  field({ id: 'f-sh-bin', collectionId: 'col-shelf-locations', key: 'bin', label: 'Bin', type: 'text', sortOrder: 3 }),
  field({ id: 'f-sh-qty', collectionId: 'col-shelf-locations', key: 'qty_on_hand', label: 'Qty On Hand', type: 'number', sortOrder: 4, min: 0 }),

  // Dispatches
  field({ id: 'f-dp-order', collectionId: 'col-dispatches', key: 'order', label: 'Order', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-dp-sku', collectionId: 'col-dispatches', key: 'sku', label: 'SKU', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-dp-qty', collectionId: 'col-dispatches', key: 'quantity', label: 'Quantity', type: 'number', required: true, sortOrder: 2, min: 0 }),
  field({ id: 'f-dp-dest', collectionId: 'col-dispatches', key: 'destination', label: 'Destination', type: 'text', sortOrder: 3 }),
  field({ id: 'f-dp-shipped', collectionId: 'col-dispatches', key: 'shipped', label: 'Shipped', type: 'date', sortOrder: 4 }),
  field({ id: 'f-dp-status', collectionId: 'col-dispatches', key: 'status', label: 'Status', type: 'select', sortOrder: 5, options: dispatchStatus }),

  // Damaged Items
  field({ id: 'f-dm-sku', collectionId: 'col-damaged-items', key: 'sku', label: 'SKU', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-dm-product', collectionId: 'col-damaged-items', key: 'product', label: 'Product', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-dm-qty', collectionId: 'col-damaged-items', key: 'quantity', label: 'Quantity', type: 'number', sortOrder: 2, min: 0 }),
  field({ id: 'f-dm-found', collectionId: 'col-damaged-items', key: 'found', label: 'Found', type: 'date', sortOrder: 3 }),
  field({ id: 'f-dm-reason', collectionId: 'col-damaged-items', key: 'reason', label: 'Reason', type: 'text', sortOrder: 4 }),
  field({ id: 'f-dm-action', collectionId: 'col-damaged-items', key: 'action', label: 'Action', type: 'text', sortOrder: 5 }),

  // Toyota Corolla
  field({ id: 'f-tc-service', collectionId: 'col-toyota-corolla', key: 'service', label: 'Service', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-tc-mileage', collectionId: 'col-toyota-corolla', key: 'mileage', label: 'Mileage', type: 'text', sortOrder: 1 }),
  field({ id: 'f-tc-date', collectionId: 'col-toyota-corolla', key: 'date', label: 'Date', type: 'date', required: true, sortOrder: 2 }),
  field({ id: 'f-tc-cost', collectionId: 'col-toyota-corolla', key: 'cost', label: 'Cost', type: 'text', sortOrder: 3 }),
  field({ id: 'f-tc-garage', collectionId: 'col-toyota-corolla', key: 'garage', label: 'Garage', type: 'text', sortOrder: 4 }),
  field({ id: 'f-tc-notes', collectionId: 'col-toyota-corolla', key: 'notes', label: 'Notes', type: 'text', sortOrder: 5 }),

  // Hyundai Tucson
  field({ id: 'f-ht-service', collectionId: 'col-hyundai-tucson', key: 'service', label: 'Service', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-ht-mileage', collectionId: 'col-hyundai-tucson', key: 'mileage', label: 'Mileage', type: 'text', sortOrder: 1 }),
  field({ id: 'f-ht-date', collectionId: 'col-hyundai-tucson', key: 'date', label: 'Date', type: 'date', required: true, sortOrder: 2 }),
  field({ id: 'f-ht-cost', collectionId: 'col-hyundai-tucson', key: 'cost', label: 'Cost', type: 'text', sortOrder: 3 }),
  field({ id: 'f-ht-garage', collectionId: 'col-hyundai-tucson', key: 'garage', label: 'Garage', type: 'text', sortOrder: 4 }),
  field({ id: 'f-ht-notes', collectionId: 'col-hyundai-tucson', key: 'notes', label: 'Notes', type: 'text', sortOrder: 5 }),

  // Scheduled Maintenance
  field({ id: 'f-sm-vehicle', collectionId: 'col-scheduled-maintenance', key: 'vehicle', label: 'Vehicle', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-sm-service', collectionId: 'col-scheduled-maintenance', key: 'service', label: 'Service', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-sm-mileage', collectionId: 'col-scheduled-maintenance', key: 'due_mileage', label: 'Due Mileage', type: 'text', sortOrder: 2 }),
  field({ id: 'f-sm-due', collectionId: 'col-scheduled-maintenance', key: 'due_date', label: 'Due Date', type: 'date', sortOrder: 3 }),
  field({ id: 'f-sm-status', collectionId: 'col-scheduled-maintenance', key: 'status', label: 'Status', type: 'select', sortOrder: 4, options: maintStatus }),

  // Software Engineering
  field({ id: 'f-se-assignment', collectionId: 'col-software-engineering', key: 'assignment', label: 'Assignment', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-se-due', collectionId: 'col-software-engineering', key: 'due', label: 'Due', type: 'date', required: true, sortOrder: 1 }),
  field({ id: 'f-se-status', collectionId: 'col-software-engineering', key: 'status', label: 'Status', type: 'select', required: true, sortOrder: 2, options: assignmentStatus }),
  field({ id: 'f-se-priority', collectionId: 'col-software-engineering', key: 'priority', label: 'Priority', type: 'select', sortOrder: 3, options: priority }),
  field({ id: 'f-se-notes', collectionId: 'col-software-engineering', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Databases
  field({ id: 'f-db-assignment', collectionId: 'col-databases', key: 'assignment', label: 'Assignment', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-db-due', collectionId: 'col-databases', key: 'due', label: 'Due', type: 'date', required: true, sortOrder: 1 }),
  field({ id: 'f-db-status', collectionId: 'col-databases', key: 'status', label: 'Status', type: 'select', required: true, sortOrder: 2, options: assignmentStatus }),
  field({ id: 'f-db-priority', collectionId: 'col-databases', key: 'priority', label: 'Priority', type: 'select', sortOrder: 3, options: priority }),
  field({ id: 'f-db-notes', collectionId: 'col-databases', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Algorithms
  field({ id: 'f-al-assignment', collectionId: 'col-algorithms', key: 'assignment', label: 'Assignment', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-al-due', collectionId: 'col-algorithms', key: 'due', label: 'Due', type: 'date', required: true, sortOrder: 1 }),
  field({ id: 'f-al-status', collectionId: 'col-algorithms', key: 'status', label: 'Status', type: 'select', required: true, sortOrder: 2, options: assignmentStatus }),
  field({ id: 'f-al-priority', collectionId: 'col-algorithms', key: 'priority', label: 'Priority', type: 'select', sortOrder: 3, options: priority }),
  field({ id: 'f-al-notes', collectionId: 'col-algorithms', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Exams
  field({ id: 'f-ex-course', collectionId: 'col-exams', key: 'course', label: 'Course', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-ex-date', collectionId: 'col-exams', key: 'date', label: 'Date', type: 'date', required: true, sortOrder: 1 }),
  field({ id: 'f-ex-room', collectionId: 'col-exams', key: 'room', label: 'Room', type: 'text', sortOrder: 2 }),
  field({ id: 'f-ex-status', collectionId: 'col-exams', key: 'status', label: 'Status', type: 'text', sortOrder: 3 }),
  field({ id: 'f-ex-notes', collectionId: 'col-exams', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Upcoming Sessions
  field({ id: 'f-us-client', collectionId: 'col-upcoming-sessions', key: 'client', label: 'Client', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-us-session', collectionId: 'col-upcoming-sessions', key: 'session', label: 'Session', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-us-date', collectionId: 'col-upcoming-sessions', key: 'date', label: 'Date', type: 'date', required: true, sortOrder: 2 }),
  field({ id: 'f-us-location', collectionId: 'col-upcoming-sessions', key: 'location', label: 'Location', type: 'text', sortOrder: 3 }),
  field({ id: 'f-us-paid', collectionId: 'col-upcoming-sessions', key: 'paid', label: 'Paid', type: 'select', sortOrder: 4, options: paidSession }),
  field({ id: 'f-us-notes', collectionId: 'col-upcoming-sessions', key: 'notes', label: 'Notes', type: 'text', sortOrder: 5 }),

  // Delivered Projects
  field({ id: 'f-dd-client', collectionId: 'col-delivered-projects', key: 'client', label: 'Client', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-dd-project', collectionId: 'col-delivered-projects', key: 'project', label: 'Project', type: 'text', required: true, sortOrder: 1 }),
  field({ id: 'f-dd-delivered', collectionId: 'col-delivered-projects', key: 'delivered', label: 'Delivered', type: 'date', sortOrder: 2 }),
  field({ id: 'f-dd-paid', collectionId: 'col-delivered-projects', key: 'paid', label: 'Paid', type: 'select', sortOrder: 3, options: yesNo }),
  field({ id: 'f-dd-notes', collectionId: 'col-delivered-projects', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),

  // Equipment
  field({ id: 'f-eq-item', collectionId: 'col-equipment', key: 'item', label: 'Item', type: 'text', required: true, sortOrder: 0 }),
  field({ id: 'f-eq-serial', collectionId: 'col-equipment', key: 'serial', label: 'Serial', type: 'text', sortOrder: 1 }),
  field({ id: 'f-eq-condition', collectionId: 'col-equipment', key: 'condition', label: 'Condition', type: 'text', sortOrder: 2 }),
  field({ id: 'f-eq-service', collectionId: 'col-equipment', key: 'last_service', label: 'Last Service', type: 'date', sortOrder: 3 }),
  field({ id: 'f-eq-notes', collectionId: 'col-equipment', key: 'notes', label: 'Notes', type: 'text', sortOrder: 4 }),
];
