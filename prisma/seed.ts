import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.service.createMany({
    data: [
      {
        title: "PVC Membrane Waterproofing",
        description:
          "Professional waterproofing using durable PVC membranes for roofs, terraces, and foundations.",
        order: 1,
      },
      {
        title: "Styrofoam Insulation",
        description:
          "Thermal insulation installation using high-quality styrofoam panels for energy efficiency.",
        order: 2,
      },
      {
        title: "Spacer Tile Installation",
        description:
          "Precise installation of spacer tiles for proper drainage and surface leveling.",
        order: 3,
      },
      {
        title: "Gravel Finishing",
        description:
          "Protective gravel layer application over waterproofed surfaces for durability.",
        order: 4,
      },
    ],
  });

  console.log("Services seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });