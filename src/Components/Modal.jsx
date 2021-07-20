import React from 'react'
import ReactDom from 'react-dom'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '25px',
  zIndex: 1000
}

const CLOSE_STYLE = {
position: 'absolute',
  top: '5px',
  right: '5px',
  zIndex: '2'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .1)',
  backdropFilter: 'blur(4px)',
  zIndex: 1000
}

export default function Modal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
      <IconButton style={CLOSE_STYLE}  onClick={onClose} aria-label="delete">
  <CloseIcon />
</IconButton>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}