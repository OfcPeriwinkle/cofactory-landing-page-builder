'use client';

import { LandingPage } from '@/app/lib/defintions';
import { Button, ButtonGroup, Card, CardHeader, CardBody, CardFooter } from '@heroui/react';
import { removeLandingPage } from '@/app/lib/actions';

import { useRouter } from 'next/navigation';

export default function LandingPageCard({ landingPage }: { landingPage: LandingPage }) {
  const router = useRouter();

  const handleDelete = async () => {
    await removeLandingPage(landingPage.id);
    router.refresh();
  };

  return (
    <Card>
      <CardHeader>
        <h2>{landingPage.title}</h2>
      </CardHeader>
      <CardBody>
        <p>Created on {landingPage.created_at.toISOString().split('T')[0]}</p>
        <p>Updated on {landingPage.updated_at.toISOString().split('T')[0]}</p>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button
            color="primary"
            onPress={() => router.push(`/landing-pages/${landingPage.id}/view`)}
          >
            View
          </Button>
          <Button
            color="primary"
            onPress={() => router.push(`/landing-pages/${landingPage.id}/edit`)}
          >
            Edit
          </Button>
          <Button color="danger" onPress={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
