export const services = [
  { label: "Transportation", to: "/services#transportation" },
  { label: "Sale / Rent", to: "/services#sale-rent" },
  {
    label: "Installation / Disassembly",
    to: "/services#installation-disassembly",
  },
];

export const serviceLinkClass = `
  relative inline-block
  transition-colors duration-200
  after:content-['']
  after:absolute after:left-0 after:-bottom-1
  after:h-[1.5px] after:w-0
  after:bg-red-600
  after:transition-all after:duration-300 after:ease-out
  hover:after:w-full
`;
