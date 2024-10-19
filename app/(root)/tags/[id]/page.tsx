import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { TagFilters } from "@/constants/filters";
import { IQuestion } from "@/database/question.model";
import { getQuestionsByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionsByTagId({
    tagId: params.id,
    page: 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900"> {result?.tagTitle} </h1>

      <div className="mt-11 w-full">
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for a tag Question"
          otherClasses=""
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions?.length > 0 ? (
          result?.questions?.map((question: IQuestion) => (
            <QuestionCard
              key={question?._id}
              _id={question?._id}
              title={question?.title}
              tags={question?.tags}
              author={question?.author}
              upvotes={question?.upvotes}
              downvotes={question?.downvotes}
              views={question?.views}
              answers={question?.answers}
              createdAt={question?.createdAt}
            />
          ))
        ) : (
          <div>
            {" "}
            <NoResult
              title=" No tag question to Show"
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

export default Page;
