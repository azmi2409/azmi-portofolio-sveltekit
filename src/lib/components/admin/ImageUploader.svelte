<script lang="ts">
	import { Upload, X, Image as ImageIcon } from '@lucide/svelte';

	let { onUpload }: { onUpload: (url: string) => void } = $props();

	let uploading = $state(false);
	let dragActive = $state(false);

	async function handleFileUpload(file: File) {
		if (!file.type.startsWith('image/')) {
			alert('Please upload an image file');
			return;
		}

		uploading = true;

		try {
			const formData = new FormData();
			formData.append('file', file);

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Upload failed');
			}

			const data = await response.json();
			onUpload(data.url);
		} catch (error) {
			alert('Failed to upload image');
		} finally {
			uploading = false;
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		dragActive = false;

		const file = e.dataTransfer?.files[0];
		if (file) {
			handleFileUpload(file);
		}
	}

	function handleFileInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const file = target.files?.[0];
		if (file) {
			handleFileUpload(file);
		}
	}
</script>

<div
	class="relative rounded-lg border-2 border-dashed p-8 text-center transition {dragActive
		? 'border-primary bg-primary/5 bg-primary/10'
		: 'border-border'}"
	ondragover={(e) => {
		e.preventDefault();
		dragActive = true;
	}}
	ondragleave={() => (dragActive = false)}
	ondrop={handleDrop}
>
	{#if uploading}
		<div class="flex flex-col items-center gap-3">
			<div
				class="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
			></div>
			<p class="text-sm text-muted-foreground">Uploading...</p>
		</div>
	{:else}
		<div class="flex flex-col items-center gap-3">
			<div class="rounded-full bg-muted p-3 bg-muted">
				<ImageIcon class="h-8 w-8 text-muted-foreground" />
			</div>
			<div>
				<label
					for="file-upload"
					class="cursor-pointer font-semibold text-primary hover:text-primary dark:text-primary dark:hover:text-blue-300"
				>
					Click to upload
				</label>
				<span class="text-muted-foreground"> or drag and drop</span>
			</div>
			<p class="text-xs text-muted-foreground ">PNG, JPG, GIF up to 10MB</p>
		</div>
		<input
			id="file-upload"
			type="file"
			accept="image/*"
			onchange={handleFileInput}
			class="hidden"
		/>
	{/if}
</div>
