import prismadb from "@/lib/prismadb";
import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";

export async function GET(
  req: Request,
  {params}: {params: {storeId: string; sizeID: string}}
) {
  try {
    if (!params.sizeID) {
      return new NextResponse("Size id is Required.", {status: 400});
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeID,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_GET]", error);
    return new NextResponse("Interal Error.", {status: 500});
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {storeId: string; sizeId: string}}
) {
  try {
    const {userId} = auth();
    const body = await req.json();

    const {name, value} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!name) {
      return new NextResponse("Name is Required.", {status: 400});
    }

    if (!value) {
      return new NextResponse("Size value is Required.", {status: 400});
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is Required.", {status: 400});
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {status: 403});
    }

    const size = await prismadb.size.updateMany({
      where: {
        id: params.sizeId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[SIZE_PATCH]", error);
    return new NextResponse("Interal Error.", {status: 500});
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {storeId: string; sizeId: string}}
) {
  try {
    const {userId} = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!params.sizeId) {
      return new NextResponse("Size id is Required.", {status: 400});
    }

    const storeByUserId = await prismadb.store.findFirst({
        where: {
          id: params.storeId,
          userId,
        },
      });
  
      if (!storeByUserId) {
        return new NextResponse("Unauthorized", {status: 403});
      }

    const size = await prismadb.size.deleteMany({
      where: {
        id: params.sizeId,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Interal Error.", {status: 500});
  }
}
