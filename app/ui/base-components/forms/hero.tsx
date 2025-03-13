'use client';

import { usePathname } from 'next/navigation';
import { editPageComponent } from '@/app/lib/actions';

export default function HeroForm({
  title = 'Enter a Title',
  subtitle = 'Enter a Subtitle',
  pageComponentId,
}: {
  title: string;
  subtitle: string;
  pageComponentId: string;
}) {
  const pathname = usePathname();
  const pageId = pathname.split('/')[2];
  const updatePageComponentWithIds = editPageComponent.bind(null, pageId, pageComponentId);
}
