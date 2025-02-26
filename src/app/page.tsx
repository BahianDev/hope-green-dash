"use client";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Home() {
  const modal = useRef<HTMLDialogElement>(null);
  const [currentProdutor, setCurrentProdutor] = useState<any>();

  // Query para os planos (usados no mapa)
  const { data: planos } = useQuery({
    queryKey: ["planos"],
    queryFn: (): Promise<any> =>
      api.get(`plano-produtivo`).then((response) => response.data.reverse()),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  // Query para os produtores (usados na listagem e modal)
  const { data: produtores } = useQuery({
    queryKey: ["produtores"],
    queryFn: (): Promise<any> =>
      api.get(`/produtor`).then((response) => response.data),
    refetchOnWindowFocus: false,
    initialData: [],
  });

  if (!planos || !produtores) return <></>;

  return (
    <>
      <div className="min-h-screen bg-white p-6">
        {/* Cabeçalho */}
        <header className="flex justify-between items-start p-2 rounded-lg mb-6">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Hope Green" width={250} height={50} />
          </div>
          <div className="w-full px-5 flex flex-col items-end gap-3">
            <div className="w-full h-[1px] bg-green-base" />
            <span className="text-davys-gray text-base">Sobre a Hope Green</span>
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
          {/* Mapa (usando os planos) */}
          <div className="col-span-2 rounded-lg p-4">
            <div className="relative w-full h-96">
              {planos.length && (
                <GoogleMapComponent
                  height="500px"
                  zoom={6}
                  markers={planos
                    .filter((plano: any) => plano.lat && plano.lng)
                    .map((plano: any) => ({
                      lat: plano.lat,
                      lng: plano.lng,
                    }))}
                />
              )}
            </div>
          </div>

          {/* Lista de produtores */}
          <aside className="bg-light-gray rounded-lg p-4 h-full max-h-[500px] mt-4 overflow-scroll">
            <h2 className="text-lg font-bold mb-4 text-davys-gray">
              Conheça os produtores
            </h2>
            <div className="space-y-4">
              {produtores.map((produtor: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 flex flex-col items-center justify-between"
                >
                  <div className="flex w-full justify-between">
                    <div>
                      <p className="font-semibold text-davys-gray uppercase">
                        {produtor.nome}
                      </p>
                      <div className="text-base text-davys-gray font-normal flex gap-2 mt-2">
                        <Image
                          src="/marker.png"
                          width={20}
                          height={20}
                          className="w-5 h-5"
                          alt="Endereço"
                        />
                        <p className="max-w-64">{produtor.endereco}</p>
                      </div>
                      <div className="text-base text-davys-gray font-normal flex gap-2 mt-2">
                        <Image
                          src="/hectare.png"
                          width={20}
                          height={20}
                          alt="Hectares"
                        />
                        <p>{produtor.hectare} Hectares</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <img
                        src={produtor.pfp}           
                        alt="Profile"
                        className="rounded-full w-20 h-20"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (modal.current) {
                        setCurrentProdutor(produtor);
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
            <p className="text-6xl font-bold mt-6">
              {produtores.reduce(
                (acc: number, prod: any) => acc + prod.hectare,
                0
              )}
            </p>
          </div>
          <div className="flex h-28 justify-between bg-light-gray text-black p-4 rounded-tr-full rounded-br-full rounded-bl-full w-52">
            <p className="text-base">
              Produtores <br />
              rurais
            </p>
            <p className="text-4xl font-bold mt-10 mr-2">
              {Array.from(new Set(produtores.map((p: any) => p.nome))).length}
            </p>
          </div>
          <div className="flex h-28 justify-between bg-light-gray text-black p-4 rounded-tr-full rounded-br-full rounded-bl-full w-52">
            <p className="text-base">Total de árvores florestais</p>
            <p className="text-4xl font-bold mt-10 mr-2">
              {produtores.reduce(
                (acc: number, prod: any) => acc + prod.quantMudasFlorestais,
                0
              )}
            </p>
          </div>
          <div className="flex h-28 justify-between bg-light-gray text-black p-4 rounded-tr-full rounded-br-full rounded-bl-full w-52">
            <p className="text-base">Total de árvores produtivas</p>
            <p className="text-4xl font-bold mt-10 mr-2">
              {produtores.reduce(
                (acc: number, prod: any) => acc + prod.quantMudasFrutiferas,
                0
              )}
            </p>
          </div>
        </footer>
      </div>

      {/* Modal com informações do produtor */}
      <dialog id="my_modal_2" className="modal mt-24" ref={modal}>
        <div className="modal-box bg-custom-gray border-green-base border-2 max-w-7xl h-full flex gap-2">
          <div className="w-1/3">
            <div className="bg-green-base text-white p-6 flex flex-col justify-between rounded-lg">
              <div>
                <div className="flex gap-2">
                  <Image
                    src={currentProdutor?.pfp || "/mock/image.png"}
                    width={50}
                    height={50}
                    alt="profile"
                    className="rounded-full w-28 h-28 border-2 border-white"
                  />
                  <div>
                    <h2 className="text-2xl font-bold uppercase">
                      {currentProdutor?.nome}
                    </h2>
                    <p className="mt-4 text-sm">
                      {currentProdutor?.endereco}
                    </p>
                  </div>
                </div>
                <div className="h-[4px] w-full bg-white mt-5" />

                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span>📅</span> {currentProdutor?.ano}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span>✉️</span> {currentProdutor?.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span> {currentProdutor?.telefone}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <button className="text-white">&lt;</button>
              <div className="flex gap-2">
                {currentProdutor?.images?.map((img: string, idx: number) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Foto"
                    className="rounded-lg w-40 h-52 object-cover"
                  />
                ))}
              </div>
              <button className="text-white">&gt;</button>
            </div>
          </div>

          <div className="w-1/3">
            <div className="flex flex-col text-black">
              <span className="font-bold text-xl">COMBOS ÁREAS:</span>
              <span className="font-normal text-lg">
                {currentProdutor?.areas ? currentProdutor.areas.join(", ") : ""}
              </span>
            </div>

            <div className="flex flex-col text-black mt-5">
              <span className="font-bold text-xl">TOTAL HECTARES:</span>
              <p className="text-xl text-black font-normal">
                {currentProdutor?.hectare}
              </p>
            </div>
            <div className="flex flex-col text-black mt-5">
              <span className="font-bold text-xl">MUDAS FLORESTAIS:</span>
              <p className="text-xl text-black font-normal">
                {currentProdutor?.quantMudasFlorestais}
              </p>
            </div>
            <div className="flex flex-col text-black mt-5">
              <span className="font-bold text-xl">MUDAS FRUTIFERAS:</span>
              <p className="text-xl text-black font-normal">
                {currentProdutor?.quantMudasFrutiferas}
              </p>
            </div>
            <div className="flex flex-col text-black mt-5">
              <span className="font-bold text-xl">
                {currentProdutor?.tituloDescricao}
              </span>
              <p className="text-base text-black font-normal">
                {currentProdutor?.descricao}
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
                  {currentProdutor?.especiesMudasFlorestais
                    ? currentProdutor.especiesMudasFlorestais.join(", ")
                    : ""}
                </p>

                <div className="bg-green-base p-2 rounded-2xl">
                  <span className="font-bold text-xl">Mudas Frutíferas</span>
                </div>
                <p className="text-gray-600 text-xl max-w-96 font-normal mt-2">
                  {currentProdutor?.especiesMudasFrutiferas
                    ? currentProdutor.especiesMudasFrutiferas.join(", ")
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
}
