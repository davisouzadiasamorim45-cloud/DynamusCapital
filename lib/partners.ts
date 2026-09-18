// Logos já recortadas rente à silhueta (public/parceiros), com fundo transparente.
// `w`/`h` são as dimensões reais do arquivo; `width` é a largura de exibição em px
// (base desktop), calculada para que todas tenham peso visual parecido:
// área da silhueta equivalente, com limite de largura e altura para os extremos.
export interface Partner {
  slug: string;
  name: string;
  w: number;
  h: number;
  width: number;
}

export const PARTNERS: Partner[] = [
  { slug: "akad", name: "Akad Seguros", w: 369, h: 143, width: 123 },
  { slug: "usebens", name: "Usebens Seguradora", w: 203, h: 49, width: 155 },
  { slug: "allianz", name: "Allianz", w: 403, h: 105, width: 149 },
  { slug: "pottencial", name: "Pottencial Seguradora", w: 249, h: 42, width: 185 },
  { slug: "aliro", name: "Aliro Seguro", w: 285, h: 182, width: 95 },
  { slug: "hdi", name: "HDI Seguros", w: 291, h: 180, width: 97 },
  { slug: "azul", name: "Azul Seguros", w: 291, h: 179, width: 97 },
  { slug: "bradesco", name: "Bradesco Seguros", w: 483, h: 108, width: 161 },
  { slug: "zurich", name: "Zurich", w: 291, h: 179, width: 97 },
  { slug: "chubb", name: "Chubb", w: 432, h: 46, width: 207 },
  { slug: "ezze", name: "Ezze Seguros", w: 312, h: 168, width: 104 },
  { slug: "mag", name: "MAG Seguros", w: 330, h: 159, width: 110 },
  { slug: "yelum", name: "Yelum Seguradora", w: 399, h: 131, width: 133 },
  { slug: "porto-seguro", name: "Porto Seguro", w: 123, h: 161, width: 58 },
  { slug: "mitsui-sumitomo", name: "Mitsui Sumitomo Seguros", w: 342, h: 153, width: 114 },
  { slug: "suhai", name: "Suhai Seguradora", w: 268, h: 82, width: 138 },
];
