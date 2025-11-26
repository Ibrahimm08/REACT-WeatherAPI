const GlassFilter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
    <filter
      id="glass"
      x="0%"
      y="0%"
      width="100%"
      height="100%"
      filterUnits="objectBoundingBox"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.004 0.01"
        numOctaves="3"
        seed="5"
        stitchTiles="noStitch"
        result="turbulence"
      />
      <feDisplacementMap
        in2="softMap"
        in="SourceGraphic"
        scale="40"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  </svg>
);

export default GlassFilter;
