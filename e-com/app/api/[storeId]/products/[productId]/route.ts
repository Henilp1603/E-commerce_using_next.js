import prismadb from "@/lib/prismadb";
import {auth} from "@clerk/nextjs";
import {NextResponse} from "next/server";

export async function GET(
  req: Request,
  {params}: {params: {storeId: string; productId: string}}
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is Required.", {status: 400});
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include:{
        images:true,
        category:true,
        color:true,
        size:true
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Interal Error.", {status: 500});
  }
}

export async function PATCH(
  req: Request,
  {params}: {params: {storeId: string; productId: string}}
) {
  try {
    const {userId} = auth();
    const body = await req.json();

    const {name,price,categoryId,colorId,sizeId,images,isFeatured,isArchived} = body;

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }
    if (!name) {
        return new NextResponse("Name is Required.", {status: 400});
    }

    if (!price) {
        return new NextResponse("Price is Required.", {status: 400});
    }

    if (!categoryId) {
        return new NextResponse("CategoryId is Required.", {status: 400});
    }

    if (!colorId) {
        return new NextResponse("ColorId is Required.", {status: 400});
    }

    if (!sizeId) {
        return new NextResponse("sizeId is Required.", {status: 400});
    }

    if (!images || !images.length) {
        return new NextResponse("Images is Required.", {status: 400});
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        isArchived,
        isFeatured,
        sizeId,
        colorId,
        categoryId,
        images:{
            deleteMany:{}
        },

       
    }
      
    });

    const product=await prismadb.product.update({
        where:{
            id:params.productId
        },
        data:{
            images:{
                createMany:{
                    data:[
                        ...images.map((img:{url:string})=>img)
                    ]
                }
            }
        }
    })

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Interal Error.", {status: 500});
  }
}

export async function DELETE(
  req: Request,
  {params}: {params: {storeId: string; productId: string}}
) {
  try {
    const {userId} = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    if (!params.productId) {
      return new NextResponse("Product id is Required.", {status: 400});
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Interal Error.", {status: 500});
  }
}
