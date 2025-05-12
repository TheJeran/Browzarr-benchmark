export function Loading({showLoading}:{showLoading:boolean}){
    return (
      showLoading && <div className='loading'>
      Loading
      </div>
    )
  }