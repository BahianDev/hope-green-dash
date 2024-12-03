"use client";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const modal = useRef<HTMLDialogElement>(null);
  const [currentPlano, setCurrentPlano] = useState<any>();

  const { data: planos } = useQuery({
    queryKey: ["files-list"],
    queryFn: (): Promise<any> =>
      api.get(`plano-produtivo`).then((response) => response.data.reverse()),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  if (!planos) return <></>;

  return (
    <>
      <div className="min-h-screen bg-white p-6">
        {/* Cabeçalho */}
        <header className="flex justify-between items-start p-2 rounded-lg mb-6">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Osten Green" width={250} height={50} />
          </div>
          <div className="w-full px-5 flex flex-col items-end gap-3">
            <div className="w-full h-[1px] bg-green-base" />
            <span className="text-davys-gray text-base">Sobre a Osten</span>
            <div className="w-60 h-[1px] bg-green-base" />
          </div>
          <div>
            <Link href="https://sb1-268fhw.vercel.app/" target="_blank">
              <button className="bg-green-base text-xl w-52 text-white px-10 py-2 rounded-lg font-bold">
                NFT Market
              </button>
            </Link>
          </div>
        </header>

        {/* Corpo principal */}
        <div className="grid grid-cols-3 gap-4">
          {/* Mapa */}
          <div className="col-span-2 rounded-lg  p-4">
            <div className="relative w-full h-96">
              {/* Aqui você pode integrar o mapa usando alguma biblioteca como Leaflet ou Google Maps */}
              <GoogleMapComponent
                markers={planos.map((plano: any) => {
                  return {
                    lat: plano.lat,
                    lng: plano.lng,
                  };
                })}
              />
            </div>
          </div>

          {/* Barra lateral direita - Lista de produtores */}
          <aside className="bg-light-gray rounded-lg p-4 h-full max-h-[500px] mt-4 overflow-scroll">
            <h2 className="text-lg font-bold mb-4 text-davys-gray">
              Conheça os produtores
            </h2>
            <div className="space-y-4">
              {planos.map((plano: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 flex flex-col items-center justify-between"
                >
                  <div className="flex w-full justify-between">
                    <div>
                      <p className="font-semibold text-davys-gray uppercase">
                        {plano.user.name}
                      </p>
                      <div className="text-base text-davys-gray font-normal flex gap-2 mt-2">
                        <Image
                          src="/marker.png"
                          width={20}
                          height={20}
                          alt="profile"
                        />
                        <p> Distrito Açuanópolis - AM</p>
                      </div>
                      <div className="text-base text-davys-gray font-normal flex gap-2 mt-2">
                        <Image
                          src="/hectare.png"
                          width={20}
                          height={20}
                          alt="profile"
                        />
                        <p>{plano.hectare} Hectares</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Image
                        src="/profile.png"
                        width={50}
                        height={50}
                        alt="profile"
                      />
                    </div>
                  </div>
                  <button
                    disabled={plano.user.name !== "Charlinha Reis dos Santos"}
                    onClick={() => {
                      if (modal.current) {
                        setCurrentPlano(plano);
                        modal.current.showModal();
                      }
                    }}
                    className="bg-green-base text-white px-2 py-1 rounded text-xs font-normal self-end"
                  >
                    Informações do produtor
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Estatísticas */}
        <footer className="bg-white rounded-lg mt-6 p-4 flex items-center gap-10">
          <div className="flex h-28 justify-between bg-green-base text-white p-4 rounded-tr-full rounded-br-full rounded-bl-full w-52">
            <p className="text-base">
              Total de <br />
              hectares <br />
              plantados
            </p>
            <p className="text-6xl font-bold mt-6">50</p>
          </div>
          <div className="flex h-28 justify-between bg-light-gray text-black p-4 rounded-tr-full rounded-br-full rounded-bl-full w-52">
            <p className="text-base">
              Produtores <br />
              rurais
            </p>
            <p className="text-4xl font-bold mt-10 mr-2">{planos.length}</p>
          </div>
          <div className="flex h-28 justify-between bg-light-gray text-black p-4 rounded-tr-full rounded-br-full rounded-bl-full w-52">
            <p className="text-base">Total de árvores florestais</p>
            <p className="text-4xl font-bold mt-10 mr-2">
              {planos
                .map((plano: any) => plano.quantMudasFlorestais)
                .reduce((acc: any, curr: any) => acc + curr, 0)}
            </p>
          </div>
          <div className="flex h-28 justify-between bg-light-gray text-black p-4 rounded-tr-full rounded-br-full rounded-bl-full w-52">
            <p className="text-base">Total de árvores produtivas</p>
            <p className="text-4xl font-bold mt-10 mr-2">
              {planos
                .map((plano: any) => plano.quantMudasFrutiferas)
                .reduce((acc: any, curr: any) => acc + curr, 0)}
            </p>
          </div>
        </footer>
      </div>
      <dialog id="my_modal_2" className="modal mt-24" ref={modal}>
        <div className="modal-box bg-custom-gray border-green-base border-2 max-w-7xl h-full flex gap-2">
          <div className="w-1/3">
            <div className="bg-green-base text-white  p-6 flex flex-col justify-between rounded-lg">
              <div>
                <div className="flex gap-2">
                  <Image
                    src="/mock/image.png"
                    width={50}
                    height={50}
                    alt="profile"
                    className="rounded-full w-full border-2 border-white"
                  />
                  <div>
                    <h2 className="text-2xl font-bold uppercase">
                      {currentPlano?.user.name}
                    </h2>
                    <p className="mt-4 text-sm">{currentPlano?.endereco}</p>
                  </div>
                </div>
                <div className="h-[4px] w-full bg-white mt-5" />

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span>📅</span> January, 2025
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>✉️</span> {currentPlano?.user.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span> +55 92 0000-0000
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <button className="text-white">&lt;</button>
              <div className="flex gap-2">
                <img
                  src="/mock/c1.jpg"
                  alt="Foto"
                  className="rounded-lg w-40 h-52 object-cover"
                />
                <img
                  src="/mock/c2.jpg"
                  alt="Foto"
                  className="rounded-lg w-40 h-52 object-cover"
                />
              </div>
              <button className="text-white">&gt;</button>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex flex-col text-black">
              <span className="font-bold text-xl">COMBOS ÁREAS:</span>
              <span className="font-normal text-lg">Culturas Anuais</span>
              <span className="font-normal text-lg">Culturas Industriais</span>
              <span className="font-normal text-lg">Reserva Legal</span>
            </div>

            <div className="flex flex-col text-black mt-5">
              <span className="font-bold text-xl">TOTAL HECTARES:</span>
              <p className="text-xl text-black font-normal">
                {currentPlano?.hectare}
              </p>
            </div>
            <div className="flex flex-col text-black mt-5">
              <span className="font-bold text-xl">MUDAS FLORESTAIS:</span>
              <p className="text-xl text-black font-normal">
                {currentPlano?.quantMudasFlorestais}
              </p>
            </div>
            <div className="flex flex-col text-black mt-5">
              <span className="font-bold text-xl">MUDAS FLORESTAIS:</span>
              <p className="text-xl text-black font-normal">
                {currentPlano?.quantMudasFrutiferas}
              </p>
            </div>
            <div className="flex flex-col text-black mt-5">
              <span className="font-bold text-xl">FAMÍLIA DOS SANTOS:</span>
              <p className="text-base text-black font-normal">
                A propriedade pertence à família de Charlinha Reis dos Santos
                desde 04 de Maio de 2015. Além de produzir para o consumo
                próprio, a família gera seu sustento a partir de árvores
                frutíferas, vendendo as safras para o mercado local. A produção
                é agroecológica, sem o uso de agrotóxicos, e tem beneficiado o
                município de Iranduba com produtos sustentáveis, promovendo a
                conservação ambiental e a agricultura
              </p>
            </div>
          </div>

          <div className="w-1/3 bg-gray-100 p-6 relative">
            <form method="dialog">
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                ✖
              </button>
            </form>

            <div className="mt-2 space-y-4">
              <div className="p-2">
                <div className="bg-green-base p-2 rounded-2xl">
                  <span className="font-bold text-xl">Mudas Florestais</span>
                </div>
                <p className="text-gray-600 text-xl max-w-96 font-normal mt-2">
                  {currentPlano?.especiesMudasFlorestais.join(", ")}
                </p>

                <div className="bg-green-base p-2 rounded-2xl">
                  <span className="font-bold text-xl">Mudas frutíferass</span>
                </div>
                <p className="text-gray-600 text-xl max-w-96 font-normal mt-2">
                  {currentPlano?.especiesMudasFrutiferas.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
