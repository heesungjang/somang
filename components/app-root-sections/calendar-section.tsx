import {
  FluentProvider,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";

import {
  DateRangeType,
  DayOfWeek,
  Calendar as FluentCalendar,
} from "@fluentui/react-calendar-compat";

import { useTheme } from "next-themes";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { IconName, IconPicker } from "@/components/ui/icon-picker";

import {
  Drawer,
  DrawerTitle,
  DrawerContent,
  DrawerFooter,
  DrawerDescription,
} from "@/components/ui/drawer";

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const DARK_THEME = {
  ...webDarkTheme,
  colorBrandBackgroundInvertedSelected: "oklch(0.3 0.01 250)",
  colorNeutralForeground1Static: "oklch(0.95 0.01 250)",
  colorBrandBackgroundInvertedHover: "oklch(0.3 0.01 250)",
  colorBrandBackground: "oklch(0.65 0.2 250)",
  colorBrandForegroundOnLightHover: "oklch(0.65 0.2 250)",
};

const LIGHT_THEME = {
  ...webLightTheme,
  colorBrandBackgroundInvertedSelected: "oklch(0.3 0.01 250)",
  colorNeutralForeground1Static: "oklch(0.95 0.01 250)",
  colorBrandBackgroundInvertedHover: "oklch(0.3 0.01 250)",
  colorBrandBackground: "oklch(0.65 0.2 250)",
  colorBrandForegroundOnLightHover: "oklch(0.65 0.2 250)",
};

const DATE_RANGE_TYPE = DateRangeType.Week;
const FIRST_DAY_OF_WEEK = DayOfWeek.Sunday;

const getCurrentWeekDates = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - currentDay);
  startOfWeek.setHours(14, 0, 0, 0);

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};

const CalendarSection = ({ isAdmin }: { isAdmin: boolean }) => {
  const { theme } = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const [selectedIcon, setSelectedIcon] = useState<IconName>("calendar");

  const calendarTheme = theme === "dark" ? DARK_THEME : LIGHT_THEME;

  const [selectedDateRange, setSelectedDateRange] = useState<Date[]>(
    getCurrentWeekDates(),
  );

  const [drawerContainer, setDrawerContainer] = useState<HTMLElement | null>(
    null,
  );

  const onSelectDate = useCallback(
    (_: Date, selectedDateRangeArray?: Date[] | undefined): void => {
      if (selectedDateRangeArray) {
        setSelectedDateRange(selectedDateRangeArray);
      }
    },
    [],
  );

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const openAlertDialog = () => setIsAlertDialogOpen(true);
  const closeAlertDialog = () => setIsAlertDialogOpen(false);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-100",
          isDrawerOpen ? "opacity-60" : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
      />
      <Drawer open={isDrawerOpen} modal={false} direction="right">
        <AlertDialog open={isAlertDialogOpen}>
          <AlertDialogContent ref={setDrawerContainer}>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-sm font-medium">
                일정 생성을 취소 하시겠습니까?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm">
                생성중인 일정은 사라집니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-4">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    closeAlertDialog();
                    closeDrawer();
                  }}
                  className="text-sm cursor-pointer min-w-24"
                >
                  취소
                </Button>
                <Button
                  onClick={closeAlertDialog}
                  className="text-sm cursor-pointer min-w-24"
                >
                  계속하기
                </Button>
              </div>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Section
          title="일정"
          titleLink="/calendar"
          action={
            <Button
              variant="link"
              className="cursor-pointer"
              onClick={openDrawer}
            >
              <Plus />
              일정 추가
            </Button>
          }
        >
          <div className="flex flex-col md:flex-row gap-4">
            <FluentProvider
              theme={calendarTheme}
              style={{ background: "none" }}
            >
              <div className="bg-card rounded-md w-full flex">
                <FluentCalendar
                  className="bg-card rounded-md h-full w-full"
                  showMonthPickerAsOverlay
                  dateRangeType={DATE_RANGE_TYPE}
                  firstDayOfWeek={FIRST_DAY_OF_WEEK}
                  onSelectDate={onSelectDate}
                />
              </div>
            </FluentProvider>
            <ScrollArea className="h-63 w-full rounded-md border bg-card"></ScrollArea>
          </div>

          <DrawerContent className="p-4">
            <DrawerTitle className="flex items-center gap-4">
              <IconPicker
                defaultValue={selectedIcon}
                value={selectedIcon}
                className="w-8 cursor-pointer"
                onValueChange={(value) => setSelectedIcon(value)}
              />
              <span>새 일정 추가</span>
            </DrawerTitle>
            <DrawerDescription className="text-xs mt-4">
              새로운 일정을 추가 해 보세요.
            </DrawerDescription>
            <Separator className="mt-2" />

            <div className="grid gap-4 py-4 my-4">
              <div className="grid gap-2.5">
                <Label className="text-xs font-medium" htmlFor="title">
                  제목
                </Label>
                <Input
                  id="title"
                  placeholder="일정 제목을 입력해 주세요."
                  className="text-sm"
                />
              </div>
              <div className="grid gap-2.5">
                <Label className="text-xs font-medium" htmlFor="description">
                  내용
                </Label>
                <Textarea
                  id="description"
                  placeholder="일정 내용을 입력해 주세요."
                  className="text-sm min-h-42"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <DateTimePicker pickerFor="시작일" />
              <DateTimePicker pickerFor="종료일" />
            </div>
            <Separator className="my-4" />
            <DrawerFooter className="mt-6">
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={openAlertDialog}
                  className="text-sm cursor-pointer min-w-24"
                >
                  취소
                </Button>
                <Button className="text-sm cursor-pointer min-w-24">
                  일정 저장
                </Button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Section>
      </Drawer>
    </>
  );
};

CalendarSection.displayName = "CalendarSection";
export default CalendarSection;
