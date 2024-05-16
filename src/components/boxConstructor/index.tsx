import { PhotoWidget } from '@/components/boxConstructor/widgets/photoWidget';
import { IPortfolioUsername } from '@/types/portfolio';
import { Tooltip } from '@material-tailwind/react';
import React, { Dispatch, useCallback, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { MdClose } from 'react-icons/md';
import 'react-resizable/css/styles.css';
import { CarouselWidget } from './widgets/carouselWidget';
import { IUser } from '@/types/user';
import { ProfileWidget } from './widgets/profileWidget';
import { UserInfoSolo } from '@/types/userInfo';
import dynamic from 'next/dynamic';
import { useUpdateCarouselByIdMutation } from '@/service/carouselService';
import { useUpdateUserDataByUserMutation } from '@/service/userDataByUserService';
import { useUpdateTextFieldByIdMutation } from '@/service/textFieldService';
const TextFieldWidget = dynamic(() => import('./widgets/textFieldWidget'), { ssr: false });


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
  type?: string;
}

type BoxProps = {
  user: IUser | null;
  portfolio: IPortfolioUsername;
  userByName: UserInfoSolo;
  gridItems: GridItem[];
  setGridItems: Dispatch<React.SetStateAction<GridItem[]>>;
  layouts: GridItem[];
  setLayouts: Dispatch<React.SetStateAction<GridItem[]>>;
  onDelete: (e: string) => void;
  openEditor: boolean;
  onOpenEditor: () => void;
}

export const BoxConstructor: React.FC<BoxProps> = ({
  user, portfolio, userByName, gridItems, setGridItems, layouts, setLayouts,
  onDelete, openEditor, onOpenEditor
}) => {

  const onLayoutChange = useCallback((newLayout: any) => {
    setGridItems(newLayout);
  }, []);


  const deleteItem = (id: string) => {
    onDelete(id)
    setLayouts(prev => {
      const updatedLayouts = prev.filter(x => x.i !== id);
      return updatedLayouts;
    });
  };

  const [updateSlider] = useUpdateCarouselByIdMutation();
  const [updateProfile] = useUpdateUserDataByUserMutation();
  const [updateTextField] = useUpdateTextFieldByIdMutation();

  // Функции обновления для каждого типа виджета
  const widgetUpdates: any = {
    slider: async (props: ReactGridLayout.Layout) => {
      updateSlider({
        id: props.i,
        data: {
          coordinate_x: props.x,
          coordinate_y: props.y,
          height: props.h,
          width: props.w
        }
      }).unwrap()
    },
    profile: async (props: ReactGridLayout.Layout) => {
      updateProfile({
        id: userByName.user_data.id,
        data: {
          coordinate_x: props.x,
          coordinate_y: props.y,
          height: props.h,
          width: props.w
        }
      })
    },
    text: async (props: ReactGridLayout.Layout) => {
      updateTextField({
        id: props.i,
        data: {
          coordinate_x: props.x,
          coordinate_y: props.y,
          height: props.h,
          width: props.w
        }
      }).unwrap()
    },
  };

  // Функции удаления для каждого типа виджета
  const widgetDeletes = {
    slider: async (props: ReactGridLayout.Layout) => {
      updateSlider({
        id: props.i,
        data: {
          coordinate_x: props.x,
          coordinate_y: props.y,
          height: props.h,
          width: props.w
        }
      }).unwrap()
    },
    profile: async (props: ReactGridLayout.Layout) => {
      // Логика для профиля
    },
    text: async (props: ReactGridLayout.Layout) => {
      // Логика для текстового виджета
    },
  };


  const onChangeDragResize = (item: ReactGridLayout.Layout) => {
    const searchItem = layouts.find(x => x.i === item.i);

    if (searchItem) {
      const widgetType = searchItem.type;
      if (widgetType) {
        const widgetCRUDFunction = widgetUpdates[widgetType];
        if (widgetCRUDFunction) {
          widgetCRUDFunction(item);
        }
      }
    }
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      draggableHandle=".drag-handle"
      layouts={{ lg: gridItems }}
      rowHeight={30}
      allowOverlap={true}
      isResizable={openEditor}
      isDraggable={openEditor}
      isDroppable={openEditor}
      preventCollision={false}
      containerPadding={[0, 0]}
      onLayoutChange={onLayoutChange}
      onDragStop={(layout, oldItem, newItem, placeholder, e, element) => {
        onChangeDragResize(newItem)
      }}
      onResizeStop={(layout, oldItem, newItem, placeholder, e, element) => {
        onChangeDragResize(newItem)
      }}
    >
      {layouts.map(item => {
        return (
          <div className={openEditor ? "border-blue-600 border-2 relative" : ""} key={item.i}>
            {openEditor &&
              <>
                <Tooltip className="!z-[10000]" content="Перенести элемент" placement="top">
                  <div className="drag-handle bg-black/10 h-3 rounded cursor-move"></div>
                </Tooltip>
                {item.type !== 'profile' &&
                  <Tooltip className="!z-[10000]" content="Удалить элемент" placement="top">
                    <div
                      className="absolute bottom-1 w-6 h-6 left-1 z-[9999] flex items-center justify-center rounded-2xl bg-red-500 text-white cursor-pointer hover:opacity-50 transition-all duration-150"
                      onClick={() => deleteItem(item.i)}
                    >
                      <MdClose
                        size={16}
                      />
                    </div>
                  </Tooltip>}
              </>
            }
            {
              (() => {
                switch (item.type) {
                  case 'slider':
                    return <CarouselWidget slider_id={item.i} user={user} userPortfolio={portfolio} />;
                  case 'profile':
                    return <ProfileWidget openEditor={openEditor} onOpenEditor={onOpenEditor} userByName={userByName} user={user} />;
                  case 'text':
                    return <TextFieldWidget openEditor={openEditor} textFieldId={item.i} />;
                  default:
                    return null;
                }
              })()
            }
          </div>
        )
      })}
    </ResponsiveGridLayout>
  );
};