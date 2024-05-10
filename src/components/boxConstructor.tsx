import { CarouselWidget } from '@/widgets/carouselWidget';
import { PhotoWidget } from '@/widgets/photoWidget';
import { TextFieldWidget } from '@/widgets/textFieldWidget';
import { IconButton, Tooltip } from '@material-tailwind/react';
import React, { useCallback, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { MdClose } from 'react-icons/md';
import 'react-resizable/css/styles.css';

// Обертываем Responsive в WidthProvider, чтобы он мог правильно рассчитать ширину
const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
  isResizable?: boolean;
}

const widgetType: any = {
  textfield_ids: () => <TextFieldWidget />,
  photo_ids: () => <PhotoWidget />,
}

export const Test: React.FC = () => {
  const data: any = {
    textfield_ids: ['id1', 'id2', 'id3'],
    photo_ids: ['id4', 'id5', 'id6'],
    slider_ids: ['id7', 'id8', 'id9'],
  };

  const keysToCombine: any = ['textfield_ids', 'photo_ids', 'slider_ids'];


  const combinedArray = keysToCombine.flatMap((key: any) => data[key]);

  const [gridItems, setGridItems] = useState({
    lg: combinedArray.map((id: any, index: any) => ({
      i: id,
      x: index % 4,
      y: Math.floor(index / 4),
      w: 1,
      h: 4,
    })) as GridItem[],
  });
  
  const [layouts, setLayouts] = useState({
    lg: combinedArray.map((id: any, index: any) => ({
      i: id,
      x: index % 4,
      y: Math.floor(index / 4),
      w: 1,
      h: 4,
    })) as GridItem[],
  });

  const onLayoutChange = useCallback((newLayout: any) => {
    setGridItems(newLayout);
  }, []);

  const addNewItem = () => {
    const newItem = { i: `${layouts.lg.length}`, x: 0, y: 32, w: 6, h: 5 };
    setLayouts(prevLayouts => ({
      ...prevLayouts,
      lg: [...prevLayouts.lg, newItem]
    }));
  };

  const deleteItem = (id: string) => {
    setLayouts(prev => {
      const newItem = prev.lg.filter(x => x.i !== id);
      
      return {
        ...prev,
        lg: newItem
      }
    })
  };


  return (
    <>
      <div onClick={addNewItem}>Add New Item</div>
      <ResponsiveGridLayout
        className="layout"
        draggableHandle=".drag-handle"
        layouts={gridItems}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        onLayoutChange={onLayoutChange}
        onDragStop={(layout, oldItem, newItem, placeholder, e, element) => {
          console.log(newItem);
        }}
        onResizeStop={(layout, oldItem, newItem, placeholder, e, element) => {
          console.log(newItem);
        }}
      >
        {layouts.lg.map(item => {
          const arrayKey: any = Object.keys(data).find(key => data[key].includes(item.i))

          return (
            <div className="border-blue-600 border-2 relative" key={item.i}>
              <div className="drag-handle bg-black/10 h-3 rounded cursor-move"></div>
              <Tooltip className="!z-[10000]" content="Удалить элемент" placement="top">
                <div
                  className="absolute bottom-1 w-6 h-6 left-1 z-[9999] flex items-center justify-center rounded-2xl bg-red-500 text-white cursor-pointer hover:opacity-50 transition-all duration-150"
                  onClick={() => deleteItem(item.i)}
                >
                  <MdClose
                    size={16}
                  />
                </div>
              </Tooltip>
              {widgetType[arrayKey]()}
            </div>
          )
        })}
      </ResponsiveGridLayout>
    </>
  );
};