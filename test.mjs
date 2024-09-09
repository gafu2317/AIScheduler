import OpenAI from 'openai';
import z from 'zod';
import { zodFunction } from 'openai/helpers/zod';

import dotenv from 'dotenv';

dotenv.config()

const apiKey = process.env.CHATGPT_KEY;

// Enum for tables
const Table = z.enum(['orders', 'customers', 'products']);

// Enum for column names
const Column = z.enum([
    'id',
    'status',
    'expected_delivery_date',
    'delivered_at',
    'shipped_at',
    'ordered_at',
    'canceled_at',
]);

// Enum for operators
const Operator = z.enum(['=', '>', '<', '<=', '>=', '!=']);

// Enum for order by direction
const OrderBy = z.enum(['asc', 'desc']);

// Dynamic value type
const DynamicValue = z.object({
    column_name: z.string(),
});

// Condition schema
const Condition = z.object({
    column: z.string(),
    operator: Operator,
    value: z.union([z.string(), z.number(), DynamicValue]),
});

// Query arguments schema
const QueryArgs = z.object({
    table_name: Table,
    columns: z.array(Column),
    conditions: z.array(Condition),
    order_by: OrderBy,
});

async function runQuery() {
    // Initialize the OpenAI client
    const client = new OpenAI({
        apiKey: 'apiKey', // APIキーを設定
    });

    // Call the OpenAI API with query function
    const completion = await client.beta.chat.completions.parse({
        model: 'gpt-4o-2024-08-06',
        messages: [
            { role: 'system', content: 'You are a helpful assistant. The current date is August 6, 2024. You help users query for the data they are looking for by calling the query function.' },
            { role: 'user', content: 'look up all my orders in May of last year that were fulfilled but not delivered on time' }
        ],
        tools: [zodFunction({ name: 'query', parameters: QueryArgs })],
    });

    // Output the parsed arguments for the query function
    console.log("APIレスポンス:", JSON.stringify(completion, null, 2));
    // console.log(completion.choices[0].message.tool_calls[0].function.parsed_arguments);
}

// Run the query
runQuery();

