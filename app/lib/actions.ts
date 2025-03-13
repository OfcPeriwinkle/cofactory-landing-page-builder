'use server';

import { ActionState } from '@/app/lib/defintions';
import { insertPageComponent } from './data';

export async function addPageComponent(
  landingPageId: string,
  index: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const baseComponentId = formData.get('baseComponentId') as string;
    const id = await insertPageComponent(landingPageId, baseComponentId, index);
    return { message: `Added component with id: ${id}`, error: {} };
  } catch (error) {
    console.error('Error adding page component:', error);
    return { message: 'Error adding page component', error: { error } };
  }
}
