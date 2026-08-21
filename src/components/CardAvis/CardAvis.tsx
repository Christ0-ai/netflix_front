import { Card } from '@heroui/react';
import type { Review } from '@/types/movies.ts';

interface CardAvisProps {
  review: Review;
}

export default function CardAvis({ review: review }: Readonly<CardAvisProps>) {
  return (
    <div className="flex flex-wrap gap-4">
      <Card className="gap-2">
        <img
          alt="Indie Hackers community"
          className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
        />
        <Card.Header>
          <Card.Title>{review.user.name}</Card.Title>
          <Card.Description>{review.comment}</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <div>
            {Array.from({ length: review.rating }).map((_, index) => (
              <span key={index}>⭐</span>
            ))}
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
