
import MenuObjective from "./MenuObjective";


type CardObjectiveProps = {
    content: string;
    createDate: string
}

export default function CardObjective(props: CardObjectiveProps) {

    return (

        <div className="w-full flex flex-col border-2 justify-center rounded-[14px] px-4 py-2">
            
            <div className="flex justify-between items-center">

                {/* Conteúdo do objetivo estratégico */}
                <div>
                    <p className="text-blue text-[20px]">
                        {props.content}
                    </p>
                </div>

                {/* Menu de editar ou deletar */}
                <div className="text-blue">
                    <MenuObjective/>
                </div>

            </div>

            <div>

                {/* Data de criação */}
                <div>
                    <span className="text-sm text-gray-500">
                        Criado em: {props.createDate}
                    </span>
                    
                </div>

            </div>

        </div>
        
    )

}