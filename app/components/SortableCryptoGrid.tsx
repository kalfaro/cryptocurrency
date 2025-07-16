import { useEffect, useState } from "react";
import { DndContext, closestCenter, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, rectSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CryptoCard from "./CryptoCard";
import type { CryptoInfo } from "~/types/crypto";

function SortableItem({ crypto }: { crypto: CryptoInfo }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: crypto.symbol });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} >
      <CryptoCard data={crypto} />
    </div>
  );
}

export default function SortableCryptoGrid({ cryptos }: { cryptos: CryptoInfo[] }) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('cryptoOrder');
    const parsed = saved ? JSON.parse(saved) : null;

    if (parsed && parsed.length > 0) {
      setItems(parsed);
    } else {
      setItems(cryptos.map((c) => c.symbol));
    }
  }, [cryptos])

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cryptoOrder', JSON.stringify(items));
    }
  }, [items]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5 // pixels
      }
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const orderedCryptos = items
    .map((symbol) => cryptos.find((c) => c.symbol === symbol))
    .filter((c): c is CryptoInfo => !!c);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
      <SortableContext items={items} strategy={rectSortingStrategy} >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {orderedCryptos.map((crypto) => (
            <SortableItem key={crypto.symbol} crypto={crypto} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
