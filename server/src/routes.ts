import { FastifyInstance } from "fastify";
import dayjs from "dayjs";
import { z } from 'zod';
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {

    app.post('/habits', async (request) => {
        const createHabitBody = z.object({
            title: z.string(),
            weekDays: z.array(
                z.number().min(0).max(6)
            )
        })

        const { title, weekDays } = createHabitBody.parse(request.body)

        console.log(title, weekDays)

        const today = dayjs().startOf('day').toDate()

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create: weekDays.map(weekDay => {
                        return {
                            week_day: weekDay,
                        }
                    })
                }
            }
        })

    })

    app.get('/day', async (request) => {
        const getDayParams = z.object({
            date: z.coerce.date()   //coerce converte a entrada de uma string neste caso, em um date... é como se ele fizesse um new Date()
        })

        const { date } = getDayParams.parse(request.query)

        const parsedDate =  dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day')

        console.log(date, weekDay)

        // todos os habitos possiveis naquele dia
        // todos que já foram completados

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at: {
                    lte: date,
                },
                weekDays: {
                    some: {
                        week_day: weekDay,
                    }
                }
            }
        })

        
        const day = await prisma.day.findFirst({
            where: {
                date: parsedDate.toDate(),
            },
            include: {
                dayHabits: true,
            }
        })

        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        })

        return {
            possibleHabits,
            completedHabits,
        }
    })
}