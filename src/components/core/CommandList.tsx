import { Command } from "../../@types/Types";
import { getApiBack } from "../../api/getApiBack";
import React, { startTransition, use, useEffect, useState } from "react";
import CommandLine from "./CommandLine";

interface CommandListProps {
  mail: string;
}

const CommandList: React.FC<CommandListProps> = ({ mail }) => {
  const [commandList, setCommandList] = useState<Command[]>([]);

  useEffect(() => {
    mail != "" && fetchData(mail);
  }, [mail]);

  const fetchData = async (mail: string) => {
    startTransition(async () => {
      try {
        let response;
        if (mail !== "all") {
          response = await getApiBack(`/orders/${mail}`);
        } else {
          response = await getApiBack("/orders/all");
        }
        setCommandList(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    });
  };

  return (
    <div>
      <h3>Historique de commandes</h3>

      <div className="command-list">
        {(!commandList || commandList.length === 0) && (
          <div>Aucune commande</div>
        )}

        {commandList?.length > 0 &&
          commandList.map((command: Command) => (
            <CommandLine key={command.ordersId} command={command} />
          ))}
      </div>
    </div>
  );
};

export default CommandList;
