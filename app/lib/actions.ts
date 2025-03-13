'use server';

import { ActionState } from '@/app/lib/defintions';
import { insertPageComponent } from './data';
import { revalidatePath } from 'next/cache';

export async function addPageComponent(
  landingPageId: string,
  index: number,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const baseComponentId = formData.get('baseComponentId') as string;
    const id = await insertPageComponent(landingPageId, baseComponentId, index);

    revalidatePath(`/landing-pages/${landingPageId}/edit`);
    return { message: `Added component with id: ${id}`, error: {} };
  } catch (error) {
    console.error('Error adding page component:', error);
    return { message: 'Error adding page component', error: { error } };
  }
}
