"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Image from "next/image";
import { api } from "@/api/axiosConfig";
import { useRouter } from "next/navigation";

interface PropsMetaCard {
  name: string;
  role: string;
}

const FORMATING_ROLE: Record<string, string> = {

  ADMIN: "ADMINISTRADOR",
  MANAGER: "GESTOR",
  EVALUATOR: "AVALIADOR",
  COMMON: "COMUM",
  STARTUP_MEMBER: "STARTUP"

}

export default function UserMetaCard({name, role}: PropsMetaCard) {
  const { isOpen, closeModal } = useModal();
  const router = useRouter()

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };

  const handleDeleteAcount = async () => {

    try {
      const token = localStorage.getItem("authtoken")

      await api.delete("/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      router.push("/login")

    } catch(error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className="p-5 border border-gray-200 bg-green rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border rounded-full">
              <Image
                width={80}
                height={80}
                src="/Default_.jpg"
                alt="user"
              />
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-center text-white dark:text-white/90 xl:text-left">
                {name}
              </h4>
              <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                <p className="text-sm text-gray-100">
                  {FORMATING_ROLE[role]}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleDeleteAcount}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-red-500 bg-white px-2 py-2 text-[16px] font-medium text-red-600 shadow-theme-xs hover:bg-red-50 lg:inline-flex lg:w-[200px]"
          >
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2m2 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h12z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Deletar conta
          </button>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Editar Informações Pessoais
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Insira seus dados para manter seu perfil atualizado.
            </p>
          </div>
          <form className="flex flex-col">
            {/* <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3"> */}
              {/* <div> */}
                {/* <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Redes Sociais
                </h5> */}

                {/* <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2"> */}
                  {/* <div>
                    <Label>Facebook</Label>
                    <Input
                      type="text"
                      defaultValue="https://www.facebook.com/PimjoHQ"
                    />
                  </div> */}

                  {/* <div>
                    <Label>X.com</Label>
                    <Input type="text" defaultValue="https://x.com/PimjoHQ" />
                  </div> */}

                  {/* <div>
                    <Label>Linkedin</Label>
                    <Input
                      type="text"
                      defaultValue="https://www.linkedin.com/company/pimjo"
                    />
                  </div> */}

                  {/* <div>
                    <Label>Instagram</Label>
                    <Input
                      type="text"
                      defaultValue="https://instagram.com/PimjoHQ"
                    />
                  </div> */}
                {/* </div> */}
              {/* </div> */}
              <div className="mt-2">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Informações Pessoais
                </h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-2">
                    <Label>Nome</Label>
                    <Input type="text" defaultValue="Antônio"/>
                  </div>

                  <div className="col-span-2">
                    <Label>Email</Label>
                    <Input type="text" defaultValue="randomuser@pimjo.com" />
                  </div>

                  {/* <div className="col-span-2 lg:col-span-1">
                    <Label>Telefone</Label>
                    <Input type="text" defaultValue="(xx) x xxxx-xxxx" />
                  </div> */}

                </div>
              </div>
            {/* </div> */}
            <div className="flex items-center gap-3 px-2 mt-10 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Fechar
              </Button>
              <Button className="bg-green" size="sm" onClick={handleSave}>
                Salvar
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
