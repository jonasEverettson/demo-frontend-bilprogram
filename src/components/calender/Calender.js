import dayjs from "dayjs";
import React, { useState } from "react";
import { generateDate, months } from "./GenerateDate"
import cn from "./cn";
import { GrFormNext, GrFormPrevious} from "react-icons/gr"
import { useNavigate } from "react-router-dom";



export default function Calendar() {
	const navigate = useNavigate();
	const days = [ "Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör" ];
	const currentDate = dayjs();
	const [today, setToday] = useState(currentDate);
	const [selectDate, setSelectDate] = useState(currentDate);
	const [car, setCar] = useState()
	return (
		<div className="flex gap-10 text-emerald-50 justify-center py-16">
			<div className="w-96  h-96 ">
				<div className="flex justify-between  items-center">
					<h1 className="select-none  font-semibold ">
						{months[today.month()]}, {today.year()}
					</h1>
					<div className="flex gap-10 items-center  ">
						<GrFormPrevious
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all  "
							onClick={() => {
								setToday(today.month(today.month() - 1));
							}}
						/>
						<h1
							className=" cursor-pointer  hover:scale-105 transition-all "
							onClick={() => {
								setToday(currentDate);
							}}
						>
							Idag
						</h1>
						<GrFormNext
							className="w-5 h-5 cursor-pointer hover:scale-105 transition-all "
							onClick={() => {
								setToday(today.month(today.month() + 1));
							}}
						/>
					</div>
				</div>
				<div className="grid grid-cols-7  ">
					{days.map((day, index) => {
						return (
							<h1
								key={index}
								className="text-sm text-center text-emerald-50 h-14 w-14 grid place-content-center text-gray-500 select-none"
							>
								{day}
							</h1>
						);
					})}
				</div>

				<div className=" grid grid-cols-7 ">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<div
									key={index}
									className="p-2 text-center h-14 grid place-content-center text-sm border-t"
								>
									<h1
										className={cn(
											currentMonth ? "" : " text-gray-400",
											today
												? "  text-white"
												: "",
											selectDate
												.toDate()
												.toDateString() ===
												date.toDate().toDateString()
												? "bg-black text-white"
												: "",
											"h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none"
										)}
										onClick={() => {
											setSelectDate(date);
										}}
									>
										{date.date()}
									</h1>
								</div>
              
							);
						}
					)}
				</div>
        <h1 className="py-2">Var vänlig och välj datum för din bokning</h1>
        <button
            onClick={() => navigate("/availableCarList")}
            className="rounded bg-slate-600 text-white px-4 py-2 font-semibold hover:bg-slate-400 center-items "
          >
            Boka
        </button>
			</div>
			<div className="h-96 w-96 sm:px-5">
				<h1 className=" font-semibold">
					{selectDate.toDate().toLocaleDateString("sv-SE")}
				</h1>
				<p className="text-gray-400">Tillgängliga bilar</p>
			</div>
		</div>
	);
}