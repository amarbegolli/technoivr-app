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

  await prisma.photo.createMany({
    data: [
      {
        url: "https://dtudrytofqumvriswekz.supabase.co/storage/v1/object/public/photos/Pishina.PNG",
        category: "HIDROIZOLIM",
        caption: "Pool waterproofing project",
        order: 1,
      },
      {
        url: "https://dtudrytofqumvriswekz.supabase.co/storage/v1/object/public/photos/Pishina%20shkallet%20edit.PNG",
        category: "HIDROIZOLIM",
        caption: "Pool stairs waterproofing detail",
        order: 2,
      },
    ],
  });

  console.log("Services and photos seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });