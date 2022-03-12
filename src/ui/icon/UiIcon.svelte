<script lang="ts">
  import { onMount } from "svelte";
  export let name: string;
  let wrapperElement: HTMLElement;

  onMount(() => {
    /**
     * TODO make icon name reactive
     */
    initIcon();
  });

  async function initIcon(): Promise<void> {
    const svgString = await fetchIcon(name);
    let svg = createSvg(svgString);
    svg = setSvgAttributes(svg);
    wrapperElement.appendChild(svg);
  }

  async function fetchIcon(name: string): Promise<string> {
    const response = await fetch(`/assets/icons/${name}.svg`);
    return await response.text();
  }

  function createSvg(svgString: string): SVGElement {
    const div = document.createElement('div') as HTMLDivElement;
    div.innerHTML = svgString;
    return div.querySelector('svg') as SVGElement;
  }

  function setSvgAttributes(svg: SVGElement): SVGElement {
    if (!svg.getAttribute('xmlns')) {
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
    svg.removeAttribute('class');
    svg.setAttribute('fit', '');
    svg.setAttribute('height', '100%');
    svg.setAttribute('width', '100%');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    return svg;
  }
</script>

<div class="IconWrapper" bind:this={wrapperElement}>
</div>

<style lang="scss">
  .IconWrapper {
    height: 24px;
    width: 24px;
  }
</style>
