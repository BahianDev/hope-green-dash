"use client";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Home() {
  const modal = useRef<HTMLDialogElement>(null);
  const [currentPlano, setCurrentPlano] = useState<any>();

  const { data: planos } = useQuery({
    queryKey: ["files-list"],
    queryFn: (): Promise<any> =>
      api.get(`plano-produtivo`).then((response) => response.data),
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
            <button className="bg-green-base text-2xl w-52 text-white px-10 py-2 rounded-lg font-bold">
              NFT Market
            </button>
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
        <div className="modal-box bg-custom-gray border-green-base border-2 max-w-7xl h-full flex">
          <div className="bg-green-base text-white w-1/3 p-6 flex flex-col justify-between">
            <div>
              <Image
                src="/avatar.png"
                width={100}
                height={100}
                alt="profile"
                className="rounded-full"
              />
              <h2 className="text-2xl font-bold uppercase">
                {currentPlano?.user.name}
              </h2>
              <p className="mt-4 text-sm max-w-40">{currentPlano?.endereco}</p>
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

            <div className="flex items-center justify-between mt-6">
              <button className="text-white">&lt;</button>
              <div className="flex gap-2">
                <img
                  src="https://via.placeholder.com/50"
                  alt="Foto"
                  className="rounded-lg w-24 h-24 object-cover"
                />
                <img
                  src="https://via.placeholder.com/50"
                  alt="Foto"
                  className="rounded-lg w-24 h-24 object-cover"
                />
              </div>
              <button className="text-white">&gt;</button>
            </div>
          </div>

          <div className="w-2/3 bg-gray-100 p-6 relative">
            <form method="dialog">
              <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                ✖
              </button>
            </form>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-xl text-black font-bold">
                  {currentPlano?.hectare}
                </p>
                <p className="text-gray-500">Hectares</p>
              </div>
              <div>
                <p className="text-xl text-black font-bold">
                  {currentPlano?.espacamento} m²
                </p>
                <p className="text-gray-500">Espaçamento</p>
              </div>
              <div>
                <p className="text-xl text-black font-bold">
                  {currentPlano?.linhas}
                </p>
                <p className="text-gray-500">Linhas</p>
              </div>
              <div>
                <p className="text-xl text-black font-bold">
                  {currentPlano?.tipoDeArea}
                </p>
                <p className="text-gray-500">Tipo de Área</p>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div>
                <h4 className="text-green-700 font-bold">Produção</h4>
                <p className="text-gray-600">
                  Ciclo: {currentPlano?.clicloProducao}
                </p>
                <p className="text-gray-600">
                  Usa Fertilizantes:{" "}
                  {currentPlano.usaFertilizantes ? "Sim" : "Não"}
                </p>
                <p className="text-gray-600">
                  Usa Pesticidas: {currentPlano?.usaPesticidas ? "Sim" : "Não"}
                </p>
              </div>
              <div>
                <h4 className="text-green-700 font-bold">Mudas</h4>
                <p className="text-gray-600 max-w-96 font-normal">
                  <strong className="font-bold">Mudas florestais:</strong>{" "}
                  {currentPlano?.especiesMudasFlorestais.join(", ")}
                </p>
                <p className="text-gray-600 max-w-96 font-normal">
                  <strong className="font-bold">Mudas frutíferas:</strong>{" "}
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
