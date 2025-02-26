"use client";
import GoogleMapComponent from "@/components/GoogleMapComponent";
import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
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

  if (!planos || !produtores) return null;

  function openModal(produtor: any) {
    setCurrentProdutor(produtor);
    modal.current?.showModal();
  }

  return (
    <>
      <div className="min-h-screen bg-white p-4 md:p-6">
        {/* Cabeçalho */}
        <header className="flex flex-col md:flex-row justify-between items-center p-4 rounded-lg mb-6 shadow-md">
          <div className="flex items-center mb-4 md:mb-0">
            <img src="/logo.png" alt="Hope Green" className="w-36 h-14" />
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Mapa (usando os planos) */}
          <div className="col-span-1 md:col-span-2 rounded-lg p-4 shadow-md">
            <div className="relative w-full h-72 md:h-[29rem]">
              {planos.length > 0 && (
                <GoogleMapComponent
                  height="100%"
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
          <aside className="bg-gray-100 rounded-lg p-4 h-full max-h-[500px] overflow-y-auto shadow-md">
            <h2 className="text-lg font-bold mb-4 text-davys-gray">
              Conheça os produtores
            </h2>
            <div className="space-y-4">
              {produtores.map((produtor: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 flex flex-col items-center justify-between shadow-sm"
                >
                  <div className="flex w-full justify-between items-center">
                    <div className="flex-1">
                      <p className="font-semibold text-davys-gray uppercase text-sm">
                        {produtor.nome}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src="/marker.png"
                          className="w-5 h-5"
                          alt="Endereço"
                        />
                        <p className="text-xs text-davys-gray">
                          {produtor.endereco}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src="/hectare.png"
                          className="w-5 h-5"
                          alt="Hectares"
                        />
                        <p className="text-xs text-davys-gray">
                          {produtor.hectare} Hectares
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      <img
                        src={produtor.pfp}
                        alt="Profile"
                        className="rounded-full w-14 h-14"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => openModal(produtor)}
                    className="mt-3 bg-green-base font-bold text-sm text-white px-2 py-1 w-52 rounded-lg self-end"
                  >
                    Informações do produtor
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Estatísticas */}
        <footer className="bg-white rounded-lg mt-6 p-4 flex flex-col md:flex-row items-center gap-4 md:gap-10 shadow-md">
          <div className="flex flex-col items-center justify-between bg-green-base text-white p-4 rounded-full w-full md:w-52">
            <p className="text-center text-base">
              Total de hectares <br /> plantados
            </p>
            <p className="text-4xl font-bold mt-2">
              {produtores.reduce(
                (acc: number, prod: any) => acc + prod.hectare,
                0
              )}
            </p>
          </div>
          <div className="flex flex-col items-center justify-between bg-gray-200 text-black p-4 rounded-full w-full md:w-52">
            <p className="text-center text-base">
              Produtores <br /> rurais
            </p>
            <p className="text-3xl font-bold mt-2">
              {Array.from(new Set(produtores.map((p: any) => p.nome))).length}
            </p>
          </div>
          <div className="flex flex-col items-center justify-between bg-gray-200 text-black p-4 rounded-full w-full md:w-52">
            <p className="text-center text-base">Total de árvores florestais</p>
            <p className="text-3xl font-bold mt-2">
              {produtores.reduce(
                (acc: number, prod: any) => acc + prod.quantMudasFlorestais,
                0
              )}
            </p>
          </div>
          <div className="flex flex-col items-center justify-between bg-gray-200 text-black p-4 rounded-full w-full md:w-52">
            <p className="text-center text-base">Total de árvores produtivas</p>
            <p className="text-3xl font-bold mt-2">
              {produtores.reduce(
                (acc: number, prod: any) => acc + prod.quantMudasFrutiferas,
                0
              )}
            </p>
          </div>
        </footer>
      </div>

      {/* Modal com informações do produtor (estrutura DaisyUI recomendada) */}
      <dialog id="my_modal_2" className="modal" ref={modal}>
        {/* 
          Usamos um <form method="dialog"> envolvendo todo o conteúdo 
          para que o botão "Fechar" feche o modal sem complicações.
        */}
        <form
          method="dialog"
          className="modal-box w-full max-w-5xl bg-gray-200 border-2 border-green-base rounded-lg p-4 max-h-[90vh] overflow-y-auto"
        >
          {/* Conteúdo do modal em si */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Coluna da esquerda */}
            <div className="w-full md:w-1/3">
              <div className="bg-green-base text-white p-6 flex flex-col justify-between rounded-lg">
                <div className="flex gap-2">
                  <img
                    src={currentProdutor?.pfp || "/mock/image.png"}
                    alt="profile"
                    className="rounded-full w-24 h-24 border-2 border-white"
                  />
                  <div>
                    <h2 className="text-xl font-bold uppercase">
                      {currentProdutor?.nome}
                    </h2>
                    <p className="mt-2 text-sm">{currentProdutor?.endereco}</p>
                  </div>
                </div>
                <div className="h-[4px] w-full bg-white my-4" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span>📅</span> {currentProdutor?.ano}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>✉️</span> {currentProdutor?.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>📞</span> {currentProdutor?.telefone}
                  </div>
                </div>
              </div>
              {/* Imagens extras */}
              <div className="flex items-center justify-between mt-4">
                <button
                  type="button"
                  className="text-green-base text-xl px-2"
                  // Caso queira adicionar funcionalidade de "voltar foto"
                  onClick={(e) => e.preventDefault()}
                >
                  &lt;
                </button>
                <div className="flex gap-2 overflow-x-auto">
                  {currentProdutor?.images?.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Foto"
                      className="rounded-lg w-32 h-40 object-cover"
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className="text-green-base text-xl px-2"
                  // Caso queira adicionar funcionalidade de "próxima foto"
                  onClick={(e) => e.preventDefault()}
                >
                  &gt;
                </button>
              </div>
            </div>

            {/* Coluna do meio */}
            <div className="w-full md:w-1/3">
              <div className="flex flex-col text-black">
                <span className="font-bold text-xl">COMBOS ÁREAS:</span>
                <span className="font-normal text-lg">
                  {currentProdutor?.areas
                    ? currentProdutor.areas.join(", ")
                    : ""}
                </span>
              </div>
              <div className="flex flex-col text-black mt-5">
                <span className="font-bold text-xl">TOTAL HECTARES:</span>
                <p className="text-xl font-normal">
                  {currentProdutor?.hectare}
                </p>
              </div>
              <div className="flex flex-col text-black mt-5">
                <span className="font-bold text-xl">MUDAS FLORESTAIS:</span>
                <p className="text-xl font-normal">
                  {currentProdutor?.quantMudasFlorestais}
                </p>
              </div>
              <div className="flex flex-col text-black mt-5">
                <span className="font-bold text-xl">MUDAS FRUTIFERAS:</span>
                <p className="text-xl font-normal">
                  {currentProdutor?.quantMudasFrutiferas}
                </p>
              </div>
              <div className="flex flex-col text-black mt-5">
                <span className="font-bold text-xl">
                  {currentProdutor?.tituloDescricao}
                </span>
                <p className="text-base font-normal">
                  {currentProdutor?.descricao}
                </p>
              </div>
            </div>

            {/* Coluna da direita */}
            <div className="w-full md:w-1/3 bg-gray-100 p-4 relative rounded">
              <div className="space-y-4">
                <div>
                  <div className="bg-green-base p-2 rounded-2xl">
                    <span className="font-bold text-xl">Mudas Florestais</span>
                  </div>
                  <p className="text-gray-700 text-base mt-2">
                    {currentProdutor?.especiesMudasFlorestais
                      ? currentProdutor.especiesMudasFlorestais.join(", ")
                      : ""}
                  </p>
                </div>
                <div>
                  <div className="bg-green-base p-2 rounded-2xl mt-4">
                    <span className="font-bold text-xl">Mudas Frutíferas</span>
                  </div>
                  <p className="text-gray-700 text-base mt-2">
                    {currentProdutor?.especiesMudasFrutiferas
                      ? currentProdutor.especiesMudasFrutiferas.join(", ")
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Área de ação (botão fechar) */}
          <div className="modal-action mt-4">
            <button className="btn bg-green-base text-white px-4 py-2 rounded">
              Fechar
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
