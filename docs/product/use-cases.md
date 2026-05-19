# Use Cases

## UC-01: Family winter food tracker

**Actor:** Parent  
**Goal:** Track stored food with expiration awareness

1. Create workspace "Family"
2. Create collection "Winter Food"
3. Add properties: Name, Quantity, Expiration Date, Consumption Rate
4. Add items as food is stored
5. Update quantity when consumed
6. Search/filter by expiration (Phase 1 basic search)

## UC-02: Parking center vehicle log

**Actor:** Attendant (Worker role)  
**Goal:** Log vehicles entering and leaving

1. Join workspace "City Parking"
2. Open collection "Vehicles"
3. Properties: Plate Number, Enter Time, Payment Status, Exit Time
4. Quick-add record on entry (minimal taps)
5. Update record on exit
6. Works offline; syncs when connection returns

## UC-03: Small warehouse inventory

**Actor:** Manager + Workers  
**Goal:** Shared item tracking with role separation

1. Owner creates workspace and invites members
2. Manager configures collection and properties
3. Workers add/update items; cannot delete collection
4. Activity log shows who changed quantities

## UC-04: Medicine tracking (elderly)

**Actor:** Individual or family caregiver  
**Goal:** Simple daily medicine log

1. Single collection "Medicines"
2. Properties: Name, Dose, Time, Taken (boolean)
3. Large touch targets, large text mode
4. Offline-first daily checkoffs

## UC-05: Workshop job board (future)

**Actor:** Team  
**Goal:** Track jobs through statuses

Deferred to Phase 2+ (views, automation). MVP supports manual status via select property.

## MVP scope boundary

Phase 1 delivers UC-01 through UC-04 at a basic level. Workflow automation, barcode, and analytics dashboards are out of scope.
