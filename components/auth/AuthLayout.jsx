import Image from "next/image";

export function AuthLayout({ children, imageSrc, title, subtitle }) {
  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Left Side - Image */}
      <div className="relative hidden w-1/2 md:block">
        <Image
          src={imageSrc}
          alt="Jewelry"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16 bg-white">
        <div className="mx-auto w-full max-w-md">
          <div>
            <h2 className="mt-6 text-3xl font-serif text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
