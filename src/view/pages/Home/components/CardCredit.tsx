import { Line } from "../../../components/Line";
import { getBank } from "../../../../app/helpers/bank";
import { CardModel } from "../../../../app/models/CardModel";
import { VisibilityValue } from "../../../components/VisibilityValue";

interface Props {
  card: CardModel;
  openModalCardEdit: () => void;
}
export function CardCredit({ card, openModalCardEdit }: Props) {
  const porcentagem = (card.value / card.limit) * 100;

  const dueDay = new Date(card.dueDate).getDate();

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Line />

      <button
        className="flex items-center justify-between w-full"
        onClick={openModalCardEdit}
      >
        <div className="flex items-center gap-2 w-full">
          <img
            alt={card.name}
            src={getBank(card.name)}
            className="h-9 w-9 rounded-full"
          />

          <div className="flex flex-col items-start w-full gap-2">
            <div className="flex items-center justify-between w-full">
              <span className="text-xs">{card.name}</span>
              <span className="text-xs">
                fecha dia <strong>{dueDay}</strong>
              </span>
            </div>
            <div className="flex items-center justify-between w-full gap-4">
              <span className="text-[10px]">
                <VisibilityValue value={100} />
              </span>
              <div className="bg-gray-900 h-1.5 rounded-xl relative w-full">
                <div
                  className="h-1.5 rounded-xl relative bg-primary"
                  style={{
                    width: `${porcentagem >= 100 ? 100 : porcentagem}%`,
                  }}
                ></div>
              </div>

              <span className="text-[10px]">
                <VisibilityValue value={card.limit} />
              </span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
