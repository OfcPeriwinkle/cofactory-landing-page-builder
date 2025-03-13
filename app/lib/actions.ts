'use server';

import { ActionState } from '@/app/lib/defintions';
import {
  insertPageComponent,
  updatePageComponent,
  deletePageComponent,
  insertLandingPage,
  deleteLandingPage,
} from './data';
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

export async function editPageComponent(
  landingPageId: string,
  pageComponentId: string,
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const props = Object.fromEntries(formData.entries());
    await updatePageComponent(landingPageId, pageComponentId, props);

    revalidatePath(`/landing-pages/${landingPageId}/edit`);
    return { message: 'Updated page component', error: {} };
  } catch (error) {
    console.error('Error updating page component:', error);
    return { message: 'Error updating page component', error: { error } };
  }
}

export async function removePageComponent(landingPageId: string, pageComponentId: string) {
  try {
    await deletePageComponent(landingPageId, pageComponentId);

    revalidatePath(`/landing-pages/${landingPageId}/edit`);
    return { message: 'Removed page component', error: {} };
  } catch (error) {
    console.error('Error removing page component:', error);
    return { message: 'Error removing page component', error: { error } };
  }
}

export async function addLandingPage(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    await insertLandingPage(title, description);

    revalidatePath('/dashboard');
    return { message: `Added landing page: ${title}`, error: {} };
  } catch (error) {
    console.error('Error adding landing page:', error);
    return { message: 'Error adding landing page', error: { error } };
  }
}

export async function removeLandingPage(landingPageId: string) {
  try {
    await deleteLandingPage(landingPageId);

    revalidatePath('/dashboard');
    return { message: 'Removed landing page', error: {} };
  } catch (error) {
    console.error('Error removing landing page:', error);
    return { message: 'Error removing landing page', error: { error } };
  }
}
