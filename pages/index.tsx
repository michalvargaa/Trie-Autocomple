import type { NextPage } from 'next';
import Head from 'next/head';

import axios from 'axios';
import { FormEvent, useRef, useState } from 'react';
import { Trie } from '../utils/Trie';

interface Props {
  data: string[];
}

const Home: NextPage<Props> = ({ data }) => {
  const inputRefTrie = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [rawData, setRawData] = useState<string[]>(data);

  const [filteredDataTrie, setFilteredDataTrie] = useState<string[]>([]);
  const [timeTrie, setTimeTrie] = useState<number>();
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [time, setTime] = useState<number>();

  let trie = new Trie(data);

  return (
    <div className='w-screen h-sreen grid place-items-center overflow-x-hidden'>
      <Head>
        <title>Search using Trie</title>
      </Head>

      <main className='py-10 flex flex-col items-center divide-y-4'>
        <p>
          datasize <span className='font-semibold'>{rawData.length}</span>
        </p>

        <section className='flex justify-center gap-[20rem] mt-5'>
          <section className='flex flex-col items-center py-10'>
            <h2>
              Searching took :{' '}
              <span className='font-bold text-red-500'>{timeTrie || '0'}</span>{' '}
              ms
            </h2>
            <h1>Trie Data Structure</h1>
            <input
              type='text'
              className='border border-black'
              ref={inputRefTrie}
              onChange={() => {
                let startTime = performance.now();
                setFilteredDataTrie(
                  inputRefTrie.current?.value! === ''
                    ? []
                    : trie.suggest(inputRefTrie.current?.value!)
                );
                let endTime = performance.now();
                setTimeTrie(endTime - startTime);
              }}
            />

            <ul>
              {filteredDataTrie.map((value: string, idx: number) => (
                <li key={idx} className='font-normal'>
                  <span className='font-bold'>
                    {value.slice(0, inputRefTrie.current?.value.length)}
                  </span>
                  {value.slice(inputRefTrie.current?.value.length)}
                </li>
              ))}
            </ul>
          </section>

          <section className='flex flex-col items-center py-10'>
            <h2>
              Searching took :{' '}
              <span className='font-bold text-red-500'>{time || '0'}</span> ms
            </h2>
            <h1>Filter method</h1>
            <input
              type='text'
              className='border border-black'
              ref={inputRef}
              onChange={() => {
                let startTime = performance.now();
                setFilteredData(
                  inputRef.current?.value! === ''
                    ? []
                    : rawData.filter((word) =>
                        word.startsWith(inputRef.current?.value!)
                      )
                );
                let endTime = performance.now();
                setTime(endTime - startTime);
              }}
            />

            <ul>
              {filteredData.map((value: string, idx: number) => (
                <li key={idx} className='font-normal'>
                  <span className='font-bold'>
                    {value.slice(0, inputRef.current?.value.length)}
                  </span>
                  {value.slice(inputRef.current?.value.length)}
                </li>
              ))}
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Home;

// This gets called on every request
export const getServerSideProps = async () => {
  // Fetch data from external API
  const res = await fetch(
    'https://random-word-api.herokuapp.com/word?number=10000'
  );
  const data: string[] = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};
