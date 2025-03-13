import { Select, SelectItem } from '@heroui/react';
import { BaseComponent } from '@/app/lib/defintions';

export default function ComponentSelect({ baseComponents }: { baseComponents: BaseComponent[] }) {
  return (
    <Select
      className="min-w-max"
      items={baseComponents}
      id="baseComponentId"
      name="baseComponentId"
      label="Base Component"
      placeholder="Select a Base Component"
    >
      {(baseComponent) => (
        <SelectItem key={baseComponent.id}>{baseComponent.friendly_name}</SelectItem>
      )}
    </Select>
  );
}
