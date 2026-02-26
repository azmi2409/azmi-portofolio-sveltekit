<script lang="ts">
	import { PUBLIC_GTM_ID } from '$env/static/public';

	const gtmEnabled = !!PUBLIC_GTM_ID && PUBLIC_GTM_ID.trim().length > 0;
	const gtmId = PUBLIC_GTM_ID?.trim() ?? '';
</script>

<svelte:head>
{#if gtmEnabled}
		<!-- Google Tag Manager -->
		{@html `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');</script>`}
		<!-- End Google Tag Manager -->
		
		<!-- Google Tag Manager (noscript) -->
		<noscript>
			<iframe
			src="https://www.googletagmanager.com/ns.html?id={gtmId}"
			height="0"
			width="0"
			style="display:none;visibility:hidden"
			title="Google Tag Manager"
		></iframe>
	</noscript>
	<!-- End Google Tag Manager (noscript) -->
	{/if}
</svelte:head>
