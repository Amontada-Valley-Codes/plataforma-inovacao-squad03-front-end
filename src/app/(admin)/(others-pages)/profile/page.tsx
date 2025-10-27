"use client"

import { api } from "@/api/axiosConfig";
import InfoCorpCard from "@/components/user-profile/InfoCorpCard";
import InfoStarCard from "@/components/user-profile/InfoStarCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { PropsProfile, PropsProfileStar } from "@/types/profileTypes";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [dataProfile, setDataProfile] = useState<PropsProfile | PropsProfileStar | null>(null);
  const [profile, setProfile] = useState(false)

  useEffect(() => {
    const getDataProfile = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        const response = await api.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDataProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDataProfile();
  }, [profile]);

  // 🔍 Função de checagem de tipo
  const isCorp = (profile: any): profile is PropsProfile =>
    profile?.companyInformation?.type === "Corporation";

  const isStartup = (profile: any): profile is PropsProfileStar =>
    profile?.companyInformation?.type === "Startup";

  return (
    <div>
      <div className="space-y-6">
        {dataProfile && (
          <>
            <UserMetaCard name={dataProfile.name} role={dataProfile.role} />
            <UserInfoCard
              profile={profile}
              setProfile={setProfile}
              name={dataProfile.name}
              role={dataProfile.role}
              email={dataProfile.email}
            />

            {/* Renderização condicional por tipo */}
            {isCorp(dataProfile) && (
              <InfoCorpCard
                address={dataProfile.companyInformation.data.mainAddress}
                cnpj={dataProfile.companyInformation.data.cnpj}
                email={dataProfile.companyInformation.data.generalEmail}
                foundationDate={dataProfile.companyInformation.data.foundationDate}
                legalName={dataProfile.companyInformation.data.legalName}
                tradingName={dataProfile.companyInformation.data.tradingName}
                phone={dataProfile.companyInformation.data.mainPhone}
                sector={dataProfile.companyInformation.data.sector}
                size={dataProfile.companyInformation.data.size}
                webSite={dataProfile.companyInformation.data.website}
              />
            )}

            {isStartup(dataProfile) && (
              <InfoStarCard
                // você pode criar um InfoStartupCard separado se quiser
                name={dataProfile.companyInformation.data.name}
                cnpj={dataProfile.companyInformation.data.cnpj}
                addess={dataProfile.companyInformation.data.location}
                sector={dataProfile.companyInformation.data.areaOfExpertise}
                
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
