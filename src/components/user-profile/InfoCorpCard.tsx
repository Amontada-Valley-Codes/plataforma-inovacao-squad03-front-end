"use client";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";

interface PropsInfoCorp {
  cnpj: string;
  legalName: string;
  tradingName: string;
  foundationDate: string;
  email: string;
  address: string;
  size: string;
  phone: string
  webSite: string;
  sector: string
} 

export default function InfoCorpCard(props: PropsInfoCorp) {
  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
              Informações da Empresa
            </h4>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  CNPJ
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.cnpj}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Nome Legal
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.legalName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Nome Comercial
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.tradingName}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Data de Fundação
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.foundationDate}
                </p>
              </div>

                <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Setor
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.sector}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Porte Empresarial
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.size}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.email}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Telefone
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.phone}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Endereço
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {props.address}
                </p>
              </div>

              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Website
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                 {props.webSite}
                </p>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}
