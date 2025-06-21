import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';

interface Photo {
  url: string;
  desc: string;
  tip: string;
}

interface ClientLightboxProps {
  photos: Photo[];
  currentIdx: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

const ClientLightbox: React.FC<ClientLightboxProps> = ({
  photos,
  currentIdx,
  onClose,
  onChangeIndex,
}) => {
  return (
    <Lightbox
      open={true}
      slides={photos.map((p) => ({
        src: p.url,
        description: p.desc,
        title: p.tip,
      }))}
      index={currentIdx}
      close={onClose}
      onSlideChange={onChangeIndex}
      plugins={[Zoom, Captions]}
    />
  );
};

export default ClientLightbox;
