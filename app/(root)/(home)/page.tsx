import HomeFilters from "@/components/home/HomeFilters";
import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import Link from "next/link";
import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import { getQuestions } from "@/lib/actions/question.action";
import { SearchParamsProps } from "@/types";

const Home = async ({ searchParams }: SearchParamsProps) => {
  const result = await getQuestions({
    searchQuery: searchParams?.q,
  });

  console.log(result.questions);
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900"> All Questions </h1>

        <Link href={"/ask-question"} className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] rounded-xl px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for a Question"
          otherClasses=""
        />

        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions?.length > 0 ? (
          result?.questions?.map((question) => (
            <QuestionCard
              key={question?._id}
              _id={question?._id}
              title={question?.title}
              tags={question?.tags}
              author={question?.author}
              upvotes={question?.upVotes}
              downvotes={question?.downVotes}
              views={question?.views}
              answers={question?.answers}
              createdAt={question?.createdAt}
            />
          ))
        ) : (
          <div>
            {" "}
            <NoResult
              title=" No question to Show"
              description="Be the first to break the silence! Ask a Question and kickstart the discussion, our query could be the next big thing others learn from. Get involved!"
              linkTitle="Ask a Question"
              link="/ask-question"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
