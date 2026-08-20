import { prisma } from "@/lib/prisma";
import { uploadPhoto, deletePhoto } from "@/actions/photos";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin";

export default async function AdminPhotosPage() {
  await requireAdmin();

  const photos = await prisma.photo.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Manage Photos
      </h1>

      {/* Upload form */}
      <form
        action={uploadPhoto}
        className="border border-gray-200 rounded-xl p-6 mb-10 space-y-4 bg-gray-50/50"
      >
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            Photo *
          </label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          >
            <option value="HIDROIZOLIM">Waterproofing</option>
            <option value="STIRODUR">Insulation</option>
            <option value="PLLAKA_DISTANCERA">Spacer Tiles</option>
            <option value="ZHAVOR">Gravel</option>
          </select>
        </div>

        <div>
          <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-1">
            Caption
          </label>
          <input
            type="text"
            id="caption"
            name="caption"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-light transition"
        >
          Upload Photo
        </button>
      </form>

      {/* Existing photos */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <Image
            src={photo.url}
            alt={photo.caption ?? ""}
            width={300}
            height={160}
            className="w-full h-40 object-cover rounded-lg"
            />
            <form
              action={deletePhoto.bind(null, photo.id)}
              className="absolute top-2 right-2"
            >
              <button
                type="submit"
                className="bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
