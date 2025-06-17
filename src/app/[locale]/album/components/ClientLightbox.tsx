'use client';
import React from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import type { Photo } from '../photo';

interface ClientLightboxProps {
  photos: Photo[];
  currentIdx: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const ClientLightbox: React.FC<ClientLightboxProps> = ({
  photos,
  currentIdx,
  onClose,
  onPrev,
  onNext,
}) => (
  <Lightbox
    mainSrc={photos[currentIdx].url}
    nextSrc={photos[(currentIdx + 1) % photos.length].url}
    prevSrc={photos[(currentIdx + photos.length - 1) % photos.length].url}
    onCloseRequest={onClose}
    onMovePrevRequest={onPrev}
    onMoveNextRequest={onNext}
    imageCaption={photos[currentIdx].desc}
  />
);

export default ClientLightbox;
