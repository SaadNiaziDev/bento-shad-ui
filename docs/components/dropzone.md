---
title: Dropzone
description: Drag-and-drop file area backed by a real file input, so click and keyboard work too.
group: Forms
---

```html preview
<label class="bk-dropzone" style="width: 340px">
  <input type="file" multiple accept="image/*,.pdf">
  <svg class="bk-icon" data-size="lg" aria-hidden="true"><use href="#i-upload"/></svg>
  <span class="bk-small">Drop files or click to upload</span>
  <span class="bk-caption">PNG, JPG or PDF, up to 10 MB</span>
  <span class="bk-dropzone-files"></span>
</label>
```

## Usage

```tsx
import { Dropzone } from 'bento-shad-ui/react';
import { Upload } from 'lucide-react';

<Dropzone multiple accept="image/*,.pdf" icon={<Upload />} hint="PNG, JPG or PDF, up to 10 MB" onFiles={(files) => upload(files)} />
```

The component shows the drag-over state and the chosen file names. Size and type limits are up to your upload code: `accept` is only a hint to the file picker.

## API

<!-- props: DropzoneProps -->

## Accessibility

- The real `<input type="file">` covers the zone, so it's reachable with Tab and opens with Enter or Space.
- Announce upload results (success or errors) with a [Toast](toast.md) or an [Alert](alert.md).
