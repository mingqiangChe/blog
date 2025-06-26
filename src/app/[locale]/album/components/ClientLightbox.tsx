'use client';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import type { Photo } from '../photo';
import ZoomableCanvas from './ZoomableCanvas';

interface Props {
  photos: Photo[];
  currentIdx: number;
  onClose: () => void;
  onChangeIndex: (i: number) => void;
}

export default function ClientLightbox({
  photos,
  currentIdx,
  onClose,
  onChangeIndex,
}: Props) {
  return (
    <Lightbox
      open
      slides={photos.map((p) => ({
        src: p.url,
        title: p.tip,
        description: p.desc,
      }))}
      index={currentIdx}
      close={onClose}
      onSlideChange={onChangeIndex}
      plugins={[Captions]}
      render={{
        slide: ({ slide }: { slide: { src: string } }) => (
          <ZoomableCanvas url={slide.src} />
        ),
      }}
    />
  );
}
