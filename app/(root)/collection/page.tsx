import Filter from "@/components/shared/Filter";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { QuestionFilters } from "@/constants/filters";
import NoResult from "@/components/shared/NoResult";
import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const result = await getSavedQuestions({
    clerkId: userId,
  });

  console.log(result?.questions);
  return (
    <>
      <h1 className="h1-bold text-dark100_light900"> Saved Questions </h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for a Question"
          otherClasses=""
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result?.questions?.length > 0 ? (
          result?.questions?.map((question: any) => (
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
              title=" No saved question to Show"
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
