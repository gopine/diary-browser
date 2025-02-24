import GithubIcon from '@/components/ui-kit/icons/github';
import Skeleton from '@/components/ui-kit/skeleton';
import { useDiary } from '@/contexts/diary.context';
import { getDayDetails } from '@/services/github';
import { GithubContent } from '@/types';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import Markdown from 'react-markdown';
import { Link, useLocation } from 'react-router';

function DayDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const { pathname } = useLocation();
  const [details, setDetails] = useState<GithubContent | null>(null);

  const { days } = useDiary();

  useMemo(() => {
    setIsLoading(true);
    getDayDetails(pathname).then((details) => {
      setDetails(details);
      setIsLoading(false);
    });
  }, [pathname]);

  const content = useMemo(() => {
    if (!details) {
      return '';
    }
    return atob(details.content || '');
  }, [details]);

  const { prev, next } = useMemo(() => {
    let prev = '';
    let next = '';

    if (!days.length || !details) {
      return { prev, next };
    }

    const index = days.findIndex((day) => day.path === details.path);
    if (index === -1) {
      return { prev, next };
    }

    prev = index > 0 ? `/${days[index - 1].path}` : '';
    next = index < days.length - 1 ? `/${days[index + 1].path}` : '';

    return { prev, next };
  }, [days, details]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between">
      <div className="min-w-370 px-16 size-fit">
        <div className="px-16 pb-24 w-full h-40 flex justify-between items-center gap-24">
          <Link
            to={prev}
            className={clsx(
              prev
                ? 'opacity-30 hover:opacity-50'
                : 'opacity-20 cursor-not-allowed'
            )}
          >
            <ArrowLeftIcon width={24} />
          </Link>
          <Link
            className="opacity-30 hover:opacity-50"
            to={details?.html_url || ''}
            target="_blank"
          >
            <GithubIcon className="w-24 h-24" />
          </Link>
          <Link
            to={next}
            className={clsx(
              next
                ? 'opacity-30 hover:opacity-50'
                : 'opacity-20 cursor-not-allowed'
            )}
          >
            <ArrowRightIcon width={24} />
          </Link>
        </div>
        {isLoading ? (
          <div>
            <Skeleton width="200px" height="30px" />
            <Skeleton className="mt-8" width="100%" height="18px" />
            <Skeleton className="mt-8" width="100%" height="18px" />
            <Skeleton className="mt-8" width="100%" height="18px" />
            <Skeleton className="mt-8" width="100%" height="18px" />
            <Skeleton className="mt-8" width="100%" height="18px" />
            <Skeleton className="mt-8" width="80px" height="18px" />
          </div>
        ) : (
          <Markdown>{content}</Markdown>
        )}
      </div>
    </div>
  );
}

export default DayDetails;
