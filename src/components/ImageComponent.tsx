import { $getNodeByKey, type LexicalEditor, type NodeKey } from 'lexical';
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { MouseEvent, Suspense, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { Divider } from '@mui/material';

const imageCache = new Set();

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

const downloadImage = async (src: string) => {
  try {
    const response = await fetch(src, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const url = window.URL.createObjectURL(new Blob([buffer]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'image.png'); // You can customize the filename here
    document.body.appendChild(link);
    link.click();

    // Clean up to avoid memory leaks
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Error downloading image:', err);
  }
};

function removeNodeByKey(editor: LexicalEditor, nodeKey: string) {
  editor.update(() => {
    const node = $getNodeByKey(nodeKey);
    if (node) {
      node.remove();
    }
  });
}

function LazyImage({
  altText,
  className,
  onClick,
  imageRef,
  src,
  width,
  height,
  maxWidth,
}: {
  altText: string;
  className: string | null;
  onClick: (event: MouseEvent<HTMLImageElement>) => void;
  height: 'inherit' | number;
  imageRef: { current: null | HTMLImageElement };
  maxWidth: number;
  src: string;
  width: 'inherit' | number;
}): JSX.Element {
  useSuspenseImage(src);
  return (
    <img
      onClick={onClick}
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        maxWidth,
        width,
      }}
    />
  );
}

export default function ImageComponent({
  src,
  altText,
  width,
  height,
  maxWidth,
  nodeKey,
}: {
  altText: string;
  caption: LexicalEditor;
  height: 'inherit' | number;
  maxWidth: number;
  nodeKey: NodeKey;
  resizable: boolean;
  showCaption: boolean;
  src: string;
  width: 'inherit' | number;
  captionsEnabled: boolean;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLImageElement | null>(null);
  const [triggerDownload, setTriggerDownload] = useState(false);

  const handleDownloadImage = () => {
    downloadImage(src);
  };

  const handleClick = (event: MouseEvent<HTMLImageElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveImage = () => {
    removeNodeByKey(editor, nodeKey);
    handleClose();
  };

  useEffect(() => {
    if (triggerDownload && imageRef.current) {
      imageRef.current.click();
      setTriggerDownload(false);
    }
  }, [triggerDownload]);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Suspense fallback={null}>
      <div>
        <LazyImage
          className=""
          onClick={handleClick}
          src={src}
          altText={altText}
          imageRef={imageRef}
          width={width}
          height={height}
          maxWidth={maxWidth}
        />
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
        >
          <div style={{ display: 'flex' }}>
            <IconButton
              onClick={handleDownloadImage}
              disableRipple
              disableFocusRipple
              aria-label="download"
            >
              <DownloadIcon />
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem />
            <IconButton
              onClick={handleRemoveImage}
              disableRipple
              disableFocusRipple
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Popover>
      </div>
    </Suspense>
  );
}
