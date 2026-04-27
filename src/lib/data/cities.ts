export type CityLink = {
  slug: string
  label: string
  region: string
}

export const cities: CityLink[] = [
  { slug: "agence-communication-dijon", label: "Dijon", region: "Côte-d'Or" },
  { slug: "agence-communication-beaune", label: "Beaune", region: "Côte-d'Or" },
  { slug: "agence-communication-chalon-sur-saone", label: "Chalon-sur-Saône", region: "Saône-et-Loire" },
  { slug: "agence-communication-macon", label: "Mâcon", region: "Saône-et-Loire" },
  { slug: "agence-communication-auxerre", label: "Auxerre", region: "Yonne" },
  { slug: "agence-communication-besancon", label: "Besançon", region: "Doubs" },
  { slug: "agence-communication-dole", label: "Dole", region: "Jura" },
  { slug: "agence-communication-nevers", label: "Nevers", region: "Nièvre" },
  { slug: "agence-communication-lyon", label: "Lyon", region: "Rhône" },
  { slug: "agence-communication-clermont-ferrand", label: "Clermont-Ferrand", region: "Puy-de-Dôme" },
]
