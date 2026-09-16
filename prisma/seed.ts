import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  
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

  await prisma.material.createMany({
    data: [
      {
        name: "PVC Waterproofing Membrane",
        brand: "Sika",
        description: "High-durability PVC waterproofing membrane, resistant to UV and weathering.",
        order: 1,
      },
      {
        name: "PVC Waterproofing Membrane",
        brand: "Bauder",
        description: "Premium PVC waterproofing membrane for long-term protection against water damage.",
        order: 2,
      },
      {
        name: "Styrofoam Insulation Panels",
        brand: "Generic",
        description: "High-density expanded polystyrene panels for thermal insulation.",
        order: 3,
      },
      {
        name: "Drainage Spacer Tiles",
        brand: "Generic",
        description: "Elevated spacer tiles allowing proper water drainage beneath the surface.",
        order: 4,
      },
      {
        name: "Washed River Gravel",
        brand: "Local Supplier",
        description: "Clean, rounded gravel used as a protective top layer over waterproofing.",
        order: 5,
      },
    ],
  });

  console.log("Photos, and materials seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });