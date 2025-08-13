type Spec = Record<string, any>;
export function buildPrompt(spec: Spec) {
  const brandDNA = "luxury custom home by a design-build firm, quiet luxury, rigorous construction detailing, realistic massing and scale";
  const styleMap: Record<string,string> = {
    european_modern: "European modern language: clean lines, refined stone and stucco, minimal ornament",
    mountain_modern: "Mountain modern language: timber and stone, broad overhangs, generous glazing",
    transitional: "Transitional language: balanced proportions, simplified trim, contemporary glazing",
  };
  const roofMap: Record<string,string> = {
    flat: "flat roof with low parapet",
    low_gable: "low-slope gable roof in standing seam metal",
    shed: "single-shed roof in standing seam metal"
  };
  const cameraMap: Record<string,string> = {
    curb_eye_level: "eye-level curbside 3/4 view, 24–35mm lens",
    aerial_three_quarter: "high oblique aerial 3/4 view",
    rear_terrace: "rear terrace perspective toward facade"
  };
  const materials = (spec.materials ?? []).map((m: string) => ({
    smooth_stucco: "smooth stucco",
    limestone: "warm limestone",
    granite: "cool granite",
    timber: "timber accents",
    metal: "architectural metal"
  }[m] || m)).join(", ");
  const tokens = [
    brandDNA, styleMap[spec.style] || "", `${spec.stories || '2'} stories`, roofMap[spec.roof] || "",
    `facade materials: ${materials || 'smooth stucco'}`,
    "floor-to-ceiling glazing including sliding pocket doors",
    "side-entry garage discreet from street",
    "framed pivot door with slim canopy",
    "flat site",
    "driveway: paver",
    "landscaping: curated",
    "golden hour light",
    cameraMap[spec.camera] || cameraMap.curb_eye_level
  ].filter(Boolean);
  const instructions = [
    "photorealistic exterior only",
    "true-to-life proportions, code-plausible details",
    "no text, no people, no cars unless implied by setting",
    "balanced composition, minimal clutter"
  ];
  return `A ${tokens.join(", ")}. Render a photorealistic architectural image of the home's exterior; ${instructions.join("; ")}.`;
}
